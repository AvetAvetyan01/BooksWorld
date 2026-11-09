using BooksWorld.Domain.Models.BookModels.SubbooksDetailsModels;
using BooksWorld.Infrastructure.Authentication;
using BooksWorld.Persistence.DataProviders;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Enums;
using Stripe.Checkout;
using MediatR;
using Stripe;

namespace BooksWorld.Application.Commands.CheckoutCommands.CheckoutSessionWebhook;

public class CheckoutSessionWebhookCommandHandler (
  IConfiguration configuration,
  ApplicationDbContext dbContext 
) : IRequestHandler<CheckoutSessionWebhookCommand, bool>
{
  private readonly IConfiguration _configuration = configuration;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<bool> Handle(CheckoutSessionWebhookCommand command, CancellationToken cancellationToken)
  {
    var rawJson = await new StreamReader(command.RequestBody).ReadToEndAsync(cancellationToken);

    try
    {
      var stripeEvent = EventUtility.ConstructEvent(
          rawJson,
          command.SignatureHeader,
          _configuration["StripeOptions:WebhooksSecrets:CheckoutWebhook"]
        );

      if (stripeEvent.Type == EventTypes.CheckoutSessionCompleted ||
          stripeEvent.Type == EventTypes.CheckoutSessionAsyncPaymentSucceeded)
      {
        if (stripeEvent.Data.Object is not Session session) 
          throw new Exception("Event.Data.Object Doesn't Convert To Stripe.Checkout.Session Type");

        if (session.PaymentStatus != "paid" && stripeEvent.Type == EventTypes.CheckoutSessionCompleted) 
          return false; 

        var order = await _dbContext.Orders
          .Include(o => o.OrderItems)
          .FirstOrDefaultAsync(o => o.Id == Convert.ToInt32(session.Metadata[CustomCheckoutMetadataes.OrderId]), cancellationToken)
          ?? throw new Exception($"Order Not Found (Id: {session.Metadata[CustomCheckoutMetadataes.OrderId]})");

        order.Status = OrderStatus.Processing;
        
        await _dbContext.SaveChangesAsync(cancellationToken);
        
        order.Status = OrderStatus.Completed;

        var buyedSubbooks = order.OrderItems.Select(oi => 
          new BoughtSubbook 
          (
            0,
            order.UserId,
            oi.BookId,
            oi.SubbookId,
            oi.Quantity
          )
        );

        await _dbContext.BuyedSubbooks.AddRangeAsync(buyedSubbooks, cancellationToken);

        var userCartBooks = _dbContext.CartBooks.Where
          (cb => cb.UserId == Guid.Parse(session.Metadata[CustomCheckoutMetadataes.UserId]));

        _dbContext.CartBooks.RemoveRange(userCartBooks);

        await _dbContext.SaveChangesAsync(cancellationToken);
      }

      return true;
    }
    catch (Exception ex)
    { 
      Console.ForegroundColor = ConsoleColor.Red;
      System.Console.WriteLine(ex.Data);
      System.Console.WriteLine(ex.Message);
      System.Console.WriteLine(ex.StackTrace);
      Console.ResetColor();
      return false;
    }
  }
}