using BooksWorld.Application.Common.AssemblyMarkers;
using BooksWorld.Application.Common.Mappings;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace BooksWorld.Application;

public static class DependencyInjection
{
  public static IServiceCollection AddApplication(this IServiceCollection services)
  {
    services.AddFluentValidationAutoValidation();
    services.AddValidatorsFromAssemblyContaining<IAssemblyMarker>();

    services.AddMediatR(config =>
        config.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));

    services.AddMappings();

    return services;
  }
}