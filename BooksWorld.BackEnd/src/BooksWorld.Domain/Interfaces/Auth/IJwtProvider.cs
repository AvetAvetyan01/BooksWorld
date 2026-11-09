using BooksWorld.Domain.Enums;

namespace BooksWorld.Domain.Interfaces.Auth;

public interface IJwtProvider
{
  string GenerateAccessToken(Guid userId, UserRole userRole);
  string GenerateRefreshToken();
}