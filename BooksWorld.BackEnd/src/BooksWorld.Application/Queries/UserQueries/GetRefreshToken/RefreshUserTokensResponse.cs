namespace BooksWorld.Application.Queries.UserQueries.GetRefreshToken;

public record RefreshUserTokensResponse
(
  string AccessToken,
  string RefreshToken
);