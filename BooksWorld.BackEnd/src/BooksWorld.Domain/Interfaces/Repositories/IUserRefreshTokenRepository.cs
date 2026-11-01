using BooksWorld.Domain.Interfaces.Generics;
using BooksWorld.Domain.Models;

namespace BooksWorld.Domain.Interfaces.Repositories;

public interface IUserRefreshTokenRepository : IRepository<UserRefreshToken>
{
  Task<UserRefreshToken?> GetTokenByValue(string tokenValue);
}