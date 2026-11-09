using BooksWorld.Infrastructure.Authentication;
using BooksWorld.Persistence.DataProviders;
using Microsoft.Extensions.Configuration;
using Stripe.Checkout;
using MediatR;
using Stripe;

namespace BooksWorld.Application.Commands.CheckoutCommands.CreateSession;

public class CreateCheckoutSessionCommandHandler 
  (IConfiguration configuration,ApplicationDbContext dbContext, StripeClient client)
  : IRequestHandler<CreateCheckoutSessionCommand, string>
{
  private readonly StripeClient _client = client;
  private readonly ApplicationDbContext _dbContext = dbContext;
  private readonly IConfiguration _configuration = configuration;

  public async Task<string> Handle
    (CreateCheckoutSessionCommand query, CancellationToken cancellationToken)
  {
    var userCartBooks = _dbContext.CartBooks.Where(cb => cb.UserId == query.UserId);

    List<SessionLineItemOptions> lineItems = [.. 
      userCartBooks
        .Select(cb => 
          new SessionLineItemOptions 
          {
            Price = cb.StripePriceId,
            Quantity = cb.Quantity == null ? 1 : cb.Quantity
          })
        ];

    List<SessionDiscountOptions> coupons = [..
      (await _client.V1.Coupons
        .ListAsync(null,null,cancellationToken))
        .Where(c => userCartBooks.Any(cb => cb.StripeCouponId == c.Id))
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
        {CustomCheckoutMetadataes.UserId, $"{query.UserId}"}
      }
    };

    if (coupons.Count > 0)
      sessionOptions.Discounts = coupons;

    Session session = await _client.V1.Checkout.Sessions.CreateAsync(sessionOptions, null, cancellationToken);

    return session.ClientSecret;
  }
}