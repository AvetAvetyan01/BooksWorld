using BooksWorld.Application.Common.Mappings;
using Microsoft.AspNetCore.CookiePolicy;

namespace BooksWorld.API;

public static class DependencyInjection
{
  public static IServiceCollection AddPresentation(this IServiceCollection services)
  {
    services.AddRouting(options =>
    {
      options.LowercaseUrls = true;
      options.LowercaseQueryStrings = true;
    });

    services.AddCookiePolicy(options =>
    {
      options.HttpOnly = HttpOnlyPolicy.Always; 
    });

    services.AddMappings();

    services.AddSwaggerGen();

    services.AddHttpContextAccessor();

    services.AddEndpointsApiExplorer();

    services
      .AddControllers()
      .AddNewtonsoftJson();    
      
    return services;  
  }
}
