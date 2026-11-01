using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Interfaces.Auth;
using BooksWorld.Infrastructure.ConfigModels;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace BooksWorld.Infrastructure.Authentication;

public class JwtProvider
(
  IOptions<JwtOptions> jwtOptions
) : IJwtProvider
{
  private readonly JwtOptions _jwtOptions = jwtOptions.Value;

  public string GenerateAccessToken(Guid userId, UserRole userRole)
  {
    var claims = new Claim[2] {
      new (CustomClaims.UserId, $"{userId}"),
      new (CustomClaims.Role, $"{userRole}")
    };

    var signingCredentials = new SigningCredentials
    (
      new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.AccessToken.SecretKey)),
      SecurityAlgorithms.HmacSha256
    );

    var token = new JwtSecurityToken
    (
      signingCredentials: signingCredentials,
      expires: DateTime.UtcNow.AddMinutes(_jwtOptions.AccessToken.ExpiresMinutes),
      claims: claims
    );

    var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

    return tokenValue;
  }

  public string GenerateRefreshToken()
  {
    var signingCredentials = new SigningCredentials
    (
      new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.RefreshToken.SecretKey)),
      SecurityAlgorithms.HmacSha256
    );

    var token = new JwtSecurityToken
    (
      signingCredentials: signingCredentials,
      expires: DateTime.UtcNow.AddHours(_jwtOptions.RefreshToken.ExpiresHours)
    );

    var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

    return tokenValue;
  }
}