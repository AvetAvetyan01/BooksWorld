using Stripe.Checkout;
using MediatR;
using Stripe;

namespace BooksWorld.Application.Queries.CheckoutQueries.GetStatus;

public class GetCheckoutSessionStatusQueryHandler(StripeClient stripeClient) 
  : IRequestHandler<GetCheckoutSessionStatusQuery, CheckoutSessionStatus>
{
  private readonly StripeClient _stripeClient = stripeClient;

  public async Task<CheckoutSessionStatus> Handle
    (GetCheckoutSessionStatusQuery query, CancellationToken cancellationToken)
  {
    var sessionOptions = new SessionGetOptions{};

    Session session = await _stripeClient.V1.Checkout.Sessions.GetAsync
      (query.SessionId, sessionOptions, null, cancellationToken);

    var status = new CheckoutSessionStatus
    (
      Status: session.Status,
      PaymentStatus: session.PaymentStatus,
      PaymentIntentId: session.PaymentIntentId,
      PaymentIntentStatus: session.PaymentIntent?.Status,
      SubscriptionId: session.PaymentIntent != null ? null : session.Subscription?.Id,
      SubscriptionStatus: session.PaymentIntent != null ? null : session.Subscription?.Status
    );

    return status;
  }
}