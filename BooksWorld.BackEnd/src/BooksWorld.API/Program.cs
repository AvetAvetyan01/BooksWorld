using BooksWorld.Domain.ConfigurationModels;
using BooksWorld.Infrastructure.ConfigModels;
using BooksWorld.Infrastructure.Extensions;
using BooksWorld.Persistence.DataProviders;
using BooksWorld.Persistence.Seeds;
using BooksWorld.API.Middlewares;
using BooksWorld.Application;
using BooksWorld.Persistence;
using System.Threading.Tasks;
using System.Configuration;
using Stripe;
using Supabase.Interfaces;

namespace BooksWorld.API;

public class Program
{
  public static async Task Main(string[] args)
  {
    var builder = WebApplication.CreateBuilder(args);
    var services = builder.Services;
    var configuration = builder.Configuration;

    // կարողանանք ստեղծել ունիկալ մեթոդ որը կստանա որպես պարամետր զանգված
    // բոլոր այն տիպերով կամ թեկուզ parmas-ով պարամետրեր, որոնք ցանկանում ենք 
    // կոնֆիգուրացնել json֊ից        
    services
      .Configure<DbOptions>(configuration.GetSection(nameof(DbOptions)))
      .Configure<JwtOptions>(configuration.GetSection(nameof(JwtOptions)))
      .Configure<PrivilegedUsers>(configuration.GetSection(nameof(PrivilegedUsers)))
      .Configure<StripeOptions>(configuration.GetSection(nameof(StripeOptions)));
      // .Configure<StripeOptions>(configuration.GetSection(nameof(StripeOptions)));

    // services.AddDataProtection();

    services
      .AddApplication()
      .AddPersistance()
      .AddPresentation()
      .AddRoleBasedJwtAuthentication(configuration);

    var supabase = new Supabase.Client
    (
      builder.Configuration["SupabaseOptions:Url"] ?? throw new Exception("Supabase Url Not Found"),
      builder.Configuration["SupabaseOptions:SecretKey"] ?? throw new Exception("Supabase Secret Key Not Found")
    );
    await supabase.InitializeAsync();

    services.AddSingleton(supabase);

    services.AddSingleton(new StripeClient
      (builder.Configuration["StripeOptions:SecretKey"] 
        ?? throw new Exception("Stripe Secret Key Not Found")));

    services.AddCors(options => 
    {
      options.AddDefaultPolicy(policyOptions =>
      {
        policyOptions
          .WithOrigins(builder.Configuration["Client:URL"]!)
          .AllowAnyMethod()
          .AllowAnyHeader()
          .AllowCredentials();
      });
    });
    
    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
      app.UseSwagger();
      app.UseSwaggerUI();
    }

    app.UseRouting();

    app.UseCors();

    app.UseCookiePolicy();

    app.UseMiddleware<SilentRefreshMiddleware>();
  
    app.UseExceptionHandler("/error");

    app.UseHsts();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    await app.PrivilegedUsersSeedAsync();

    app.Run();
  }
}