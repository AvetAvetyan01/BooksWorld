using BooksWorld.Domain.Interfaces.Auth;
using BooksWorld.Infrastructure.Authentication;
using BooksWorld.Infrastructure.ConfigModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BooksWorld.Infrastructure.Extensions;

public static partial class ApiExtensions
{
  public static void AddRoleBasedJwtAuthentication(
    this IServiceCollection services, 
    IConfiguration configuration)
  {
    var jwtOptions = configuration.GetSection(nameof(JwtOptions)).Get<JwtOptions>();

    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
          ValidateIssuer = false,
          ValidateAudience = false,
          ValidateLifetime = true,
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey
            (Encoding.UTF8.GetBytes(jwtOptions!.AccessToken.SecretKey))
        };

        options.Events = new JwtBearerEvents
        {
          OnMessageReceived = (context) =>
          {
            // System.Console.WriteLine($"-- OnMessageReceived --");
            // System.Console.WriteLine($"Access:  {context.Request.Cookies[CookieNames.Access_Token_Name]}\n--------------");
            // System.Console.WriteLine($"Refresh: {context.Request.Cookies[CookieNames.Refresh_Token_Name]} \n");

            context.Token = context.Request.Cookies[CookieNames.Access_Token_Name];

            return Task.CompletedTask;
          },
          OnTokenValidated = context => 
          {
            // System.Console.WriteLine($"OnTokenValidated: {context.Request.Cookies[CookieNames.Access_Token_Name]}");
            // System.Console.WriteLine($"OnTokenValidated SecurityToken: {context.SecurityToken}\n");

            return Task.CompletedTask;
          },
          OnAuthenticationFailed = context =>
          {
            // System.Console.WriteLine($"OnAuthenticationFailed: {context.Request.Cookies[CookieNames.Access_Token_Name]}\n");

            System.Console.ForegroundColor = ConsoleColor.Red;
            System.Console.WriteLine(context.Exception.Message + '\n');
            System.Console.ResetColor();
            
            // System.Console.WriteLine($"Refresh Token: {context.Request.Cookies[CookieNames.Refresh_Token_Name]}");

            return Task.CompletedTask;
          },
        };
      });
      
    services.AddScoped<IJwtProvider, JwtProvider>();
    services.AddScoped<IPasswordHasher, PasswordHasher>();

    services.AddAuthorization();
  }
}