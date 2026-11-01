using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Domain.Models;
using BooksWorld.Persistence.DataProviders;
using BooksWorld.Persistence.Repositories.Common;
using Microsoft.EntityFrameworkCore;

namespace BooksWorld.Persistence.Repositories;

public class UserRefreshTokenRepository(ApplicationDbContext context) 
  : StandartRepository<UserRefreshToken>(context), IUserRefreshTokenRepository
{
  private readonly ApplicationDbContext _context = context;

  public async Task<UserRefreshToken?> GetTokenByValue(string tokenValue) =>
    await _context.UsersRefreshTokens
      .FirstOrDefaultAsync(t => t.Value == tokenValue);

  // probably our 'update' method works not good 
}
