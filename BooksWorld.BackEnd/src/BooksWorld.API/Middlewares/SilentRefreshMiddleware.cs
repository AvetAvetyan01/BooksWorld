using BooksWorld.Application.Queries.UserQueries.GetRefreshToken;
using BooksWorld.Infrastructure.Authentication;
using System.IdentityModel.Tokens.Jwt;
using MediatR;

namespace BooksWorld.API.Middlewares;

public class SilentRefreshMiddleware(
  RequestDelegate next,
  IServiceScopeFactory _scopeFactory
){
  private readonly RequestDelegate _next = next;
  private readonly IServiceScopeFactory _scopeFactory = _scopeFactory;

  public async Task InvokeAsync(HttpContext context)
  {
    var aToken = context.Request.Cookies[CookieNames.Access_Token_Name];
    var rToken = context.Request.Cookies[CookieNames.Refresh_Token_Name];

    if (aToken is not null) System.Console.WriteLine($"{TimeOnly.FromDateTime(DateTime.Now)}:{DateTime.Now.Second}  a  " + string.Join("",aToken.Split('.').TakeLast(1)));
    if (rToken is not null) System.Console.WriteLine($"{TimeOnly.FromDateTime(DateTime.Now)}:{DateTime.Now.Second}  r  " + string.Join("",rToken.Split('.').TakeLast(1)));

    if (!string.IsNullOrEmpty(aToken) && IsTokenExpired(aToken))
    {
      var refreshToken = context.Request.Cookies[CookieNames.Refresh_Token_Name];

      if (!string.IsNullOrEmpty(refreshToken))
      {
        using var scope = _scopeFactory.CreateScope();
        var _mediator = scope.ServiceProvider.GetRequiredService<IMediator>();

        var result = await _mediator.Send(new RefreshUserTokensQuery(refreshToken));

        if (result.AccessToken  is not null) System.Console.WriteLine($"New Access:  {string.Join("",result.AccessToken.Split('.').TakeLast(1))}");

        context.Request.Headers.Authorization = "Bearer " + result.AccessToken;

        context.Response.Cookies.Append(CookieNames.Access_Token_Name,  result.AccessToken!);
        context.Response.Cookies.Append(CookieNames.Refresh_Token_Name, result.RefreshToken!);
      }
    }

    await _next(context);
  }

  private static bool IsTokenExpired(string token)
  {
    var jwtHandler = new JwtSecurityTokenHandler();
    var jwtToken = jwtHandler.ReadJwtToken(token);

    return jwtToken.ValidTo < DateTime.UtcNow;
  }
}