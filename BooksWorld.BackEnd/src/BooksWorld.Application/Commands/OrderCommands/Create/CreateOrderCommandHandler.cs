using BooksWorld.Application.Queries.CartQueries.GetUserCartBooks;
using BooksWorld.Infrastructure.Authentication;
using BooksWorld.Persistence.DataProviders;
using Microsoft.Extensions.Configuration;
using BooksWorld.Domain.Models;
using BooksWorld.Domain.Enums;
using Stripe.Checkout;
using MediatR;
using Stripe;
using Microsoft.EntityFrameworkCore;

namespace BooksWorld.Application.Commands.OrderCommands.Create;

public class CreateOrderCommandHandler(
  IMediator mediator,
  StripeClient stripeClient,
  IConfiguration configuration,
  ApplicationDbContext dbContext
) : IRequestHandler<CreateOrderCommand, string>
{
  private readonly IMediator _mediator = mediator;
  private readonly StripeClient _stripeClient = stripeClient;
  private readonly IConfiguration _configuration = configuration;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<string> Handle(CreateOrderCommand command, CancellationToken cancellationToken)
  {
    var cartBooks = await _mediator.Send(new GetUserCartBooksQuery(command.UserId, Currency.AMD), cancellationToken);

    foreach(var cartBook in cartBooks)
      if (!_dbContext.Subbooks.Contains(cartBook.Subbook))
        throw new Exception($"Subbook Not Found (Subbook Id: {cartBook.Subbook.Id})");

    var order = new Order
    {
      UserId = command.UserId,
      Description = command.Description,
      ShippingAddress = command.ShippingAddress,
      Status = OrderStatus.Pending,
      StripeCheckoutSessionId = "",
      Currency = Currency.AMD,
      CreatedAt = DateTime.UtcNow,
      TotalAmount = 0,
      OrderItems = []
      // TotalAmount = orderItems.Sum(oi => oi.Subtotal),
      // OrderItems = orderItems
    };

    ICollection<OrderItem> orderItems = [];

    foreach(var cartBook in cartBooks)
    { 
      orderItems.Add(new ()
      {
        OrderId = order.Id,
        BookId = cartBook.BookId,
        Format = cartBook.Subbook.Format,
        Quantity = cartBook.Quantity,
        Subtotal = cartBook.Subbook.Price * (decimal)(cartBook.Quantity != null ? cartBook.Quantity  : 1),
        UnitPrice = cartBook.Subbook.Price,
        SubbookId = cartBook.Subbook.Id,
        StripeCouponId = cartBook.StripeCouponId,
        StripePriceId = cartBook.StripePriceId,
      });
    }

    order.TotalAmount = orderItems.Sum(oi => oi.Subtotal);
    order.OrderItems = orderItems;

    await _dbContext.Orders.AddAsync(order, cancellationToken);

    await _dbContext.SaveChangesAsync(cancellationToken);

    List<SessionLineItemOptions> lineItems = [.. 
      cartBooks
        .Select(cb => 
          new SessionLineItemOptions {
            Price = cb.StripePriceId,
            Quantity = cb.Quantity == null ? 1 : cb.Quantity
          })
        ];

    List<SessionDiscountOptions> coupons = [..
      (await _stripeClient.V1.Coupons
        .ListAsync(null,null,cancellationToken))
        .Where(c => cartBooks.Any(cb => cb.StripeCouponId == c.Id))
        .Select(c => new SessionDiscountOptions { Coupon = c.Id })
      ];

    var sessionOptions = new SessionCreateOptions
    {
      // UiMode = "elements",
      UiMode = "embedded_page",
      Mode = "payment",
      // Discounts = coupons,
      ReturnUrl = $"{_configuration["Client:URL"]}/checkout/complete/{{CHECKOUT_SESSION_ID}}",
      LineItems = lineItems,
      Metadata = new ()
      {
        {CustomCheckoutMetadataes.UserId,  $"{command.UserId}"},
        {CustomCheckoutMetadataes.OrderId, $"{order.Id}"},
      }
    };

    if (coupons.Count > 0)
      sessionOptions.Discounts = coupons;

    Session session = await _stripeClient.V1.Checkout.Sessions.CreateAsync(sessionOptions, null, cancellationToken);

    order.Status = OrderStatus.PaymentAwaiting;
    order.StripeCheckoutSessionId = session.ClientSecret;

    await _dbContext.SaveChangesAsync(cancellationToken);
   
    return session.ClientSecret;
  }
}

