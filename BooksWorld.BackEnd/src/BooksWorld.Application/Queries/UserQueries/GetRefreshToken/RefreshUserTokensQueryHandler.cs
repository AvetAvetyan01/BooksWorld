using BooksWorld.Persistence.DataProviders;
using BooksWorld.Infrastructure.Authentication;
using BooksWorld.Domain.Interfaces.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using MediatR;

namespace BooksWorld.Application.Queries.UserQueries.GetRefreshToken;

public class RefreshUserTokensQueryHandler(
  IJwtProvider jwtProvider,
  ApplicationDbContext dbContext
) : IRequestHandler<RefreshUserTokensQuery, RefreshUserTokensResponse>
{
  private readonly IJwtProvider _jwtProvider = jwtProvider;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<RefreshUserTokensResponse> Handle
    (RefreshUserTokensQuery query, CancellationToken cancellationToken) 
  {
    var token = await _dbContext.UsersRefreshTokens
      .FirstOrDefaultAsync(t => t.Value == query.Token, cancellationToken)
      ?? throw new Exception($"Refresh Token Not Found (Token: {string.Join("",query.Token.Split('.').TakeLast(1))})");

    // in future we need to give more normalized errors 

    // stay careful from this condition 
    if (token.IsRevoked) 
      throw new Exception("Used Revoked Refresh Token");

    var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == token.UserId, cancellationToken) 
      ?? throw new Exception("User Not Found");
    
    if (token.IsUsed)
    {
      var secondsSinceUsed = (DateTime.UtcNow - token.UsedAt).TotalSeconds;
      
      if (secondsSinceUsed > 30) 
      {
        // we will revoke all tokends related with user and return falure result
        token.IsRevoked = true;
        await _dbContext.SaveChangesAsync(cancellationToken);
        
        // _httpContext.Response.Cookies.Delete(CookieNames.Access_Token_Name);
        // _httpContext.Response.Cookies.Delete(CookieNames.Refresh_Token_Name);

        throw new Exception($"Program Is Using Used Refresh Token $(Token: {string.Join("", query.Token.Split('.').TakeLast(1))})");
      }

      var tempAccessToken = _jwtProvider.GenerateAccessToken(user.Id, user.Role);

      System.Console.WriteLine("---Temprourary Access Token Generated---");

      return new RefreshUserTokensResponse
      (
        AccessToken : tempAccessToken,
        RefreshToken : token.Value
      );
    }

    // in future we need to delete previous refresh token or regulary clean refresh tokens table
  
    token.IsUsed = true;
    token.UsedAt = DateTime.UtcNow;

    await _dbContext.SaveChangesAsync(cancellationToken);

    var accessToken  = _jwtProvider.GenerateAccessToken(user.Id, user.Role);
    var refreshToken = _jwtProvider.GenerateRefreshToken();

    await _dbContext.UsersRefreshTokens.AddAsync(new ()
    {
      UserId = user.Id,
      Value = refreshToken,
    }, 
    cancellationToken);

    await _dbContext.SaveChangesAsync(cancellationToken);

    Console.ForegroundColor = ConsoleColor.Yellow;
    System.Console.WriteLine($"Refresh Token updated\nFrom: {string.Join("",query.Token!.Split('.').TakeLast(1))}\nTo:   {string.Join("",refreshToken.Split('.').TakeLast(1))}");
    Console.ResetColor();

    return new RefreshUserTokensResponse
    (
      AccessToken: accessToken,
      RefreshToken: refreshToken
    );
  }
}