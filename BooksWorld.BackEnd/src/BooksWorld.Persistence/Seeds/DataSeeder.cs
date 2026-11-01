using BooksWorld.Persistence.DataProviders;
using Microsoft.Extensions.DependencyInjection;
using BooksWorld.Infrastructure.ConfigModels;
using BooksWorld.Domain.Interfaces.Auth;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Options;
using BooksWorld.Domain.Models;
using BooksWorld.Domain.Enums;

namespace BooksWorld.Persistence.Seeds;

public static class DataSeeder
{
 public static async Task PrivilegedUsersSeedAsync(this WebApplication app)
 {
  using var scope = app.Services.CreateScope();

  var services = scope.ServiceProvider;

  var dbContext = services.GetRequiredService<ApplicationDbContext>();
  var passwordHasher = services.GetRequiredService<IPasswordHasher>();
  var privilegedUsersConfig = services.GetRequiredService<IOptions<PrivilegedUsers>>();

  if (!dbContext.Users.Any())
  {
   var admins = privilegedUsersConfig.Value.Admins
     .Select(pu =>
        new User
        {
          Name = pu.Name,
          Email = pu.Email,
          Role = UserRole.Admin,
          PasswordHash = passwordHasher.Generate(pu.Password),
        });

   // managers in future (probably)
   await dbContext.Users.AddRangeAsync(admins);

   await dbContext.SaveChangesAsync();
  }
 }
}