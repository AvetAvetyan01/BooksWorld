namespace BooksWorld.Application.Queries.CheckoutQueries.GetStatus;

public record CheckoutSessionStatus
(
  string  Status,
  string  PaymentStatus,
  string  PaymentIntentId,
  string? PaymentIntentStatus,
  string? SubscriptionId,
  string? SubscriptionStatus
);