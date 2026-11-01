using MediatR;

namespace BooksWorld.Application.Queries.UserQueries.GetRefreshToken;

public record RefreshUserTokensQuery(string Token) : IRequest<RefreshUserTokensResponse>;