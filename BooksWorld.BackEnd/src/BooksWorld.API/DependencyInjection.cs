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
      // սա մենք ժամանակավոր ենք անում, որպեսզի մեր cookie-ները կարողանանք տեղադրել 
      // բրաուզերում HTTP պռատակոլով, առանց սրա մեզ չի թողնում որ դա անենք, քանի որ Secure
      // ֆլագը սահմանափակումա կուկիների փոխանցման պրոտոկոլը HTTPS-ով
      // options.Secure = CookieSecurePolicy.Always;
      options.HttpOnly = HttpOnlyPolicy.Always; 
    });

    services.AddMappings();

    services.AddSwaggerGen();

    services.AddHttpContextAccessor();

    services.AddEndpointsApiExplorer();

    services
      .AddControllers()
      .AddNewtonsoftJson();    

    // services.AddCors(options => 
    // {
    //   options.AddDefaultPolicy(policyOptions =>
    //   {
    //     policyOptions
    //       .WithOrigins("http://localhost:5173")
    //       .AllowAnyMethod()
    //       .AllowAnyHeader()
    //       .AllowCredentials()
    //       ; // allow only one origin
    //       // .AllowAnyOrigin()
    //   });
    // });


    return services;  
  }
}
