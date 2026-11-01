using MediatR;

namespace BooksWorld.Application.Queries.CheckoutQueries.GetStatus;

public record GetCheckoutSessionStatusQuery(
  string SessionId,
  Guid UserId
) 
: IRequest<CheckoutSessionStatus>;