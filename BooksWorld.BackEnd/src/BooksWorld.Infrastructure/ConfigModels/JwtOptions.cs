using BooksWorld.Infrastructure.ConfigModels.TokenOptions;

namespace BooksWorld.Infrastructure.ConfigModels;

public class JwtOptions
{
    public required AccessTokenOptions  AccessToken  { get; set; }
    public required RefreshTokenOptions RefreshToken { get; set; }
}