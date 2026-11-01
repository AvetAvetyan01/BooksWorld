using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Persistence.DataProviders;
using BooksWorld.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BooksWorld.Persistence;

public static class DependencyInjection
{
  public static IServiceCollection AddPersistance(this IServiceCollection services)
  {
    services.AddScoped<IAuthorRepository, AuthorRepository>();
    services.AddScoped<IGenreRepository, GenreRepository>();
    services.AddScoped<IBookRepository, BookRepository>();
    services.AddScoped<IOrderRepository, OrderRepository>();
    services.AddScoped<IReviewRepository, ReviewRepository>();
    services.AddScoped<ISubbookRepository, SubbookRepository>();
    services.AddScoped<ICartRepository, CartRepository>();
    services.AddScoped<IUserRepository, UserRepository>();
    services.AddScoped<IUserRefreshTokenRepository, UserRefreshTokenRepository>();

    services.AddDbContext<ApplicationDbContext>();

    return services;
  }
}