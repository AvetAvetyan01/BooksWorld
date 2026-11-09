using BooksWorld.Domain.Models;

namespace BooksWorld.Domain.Interfaces.Repositories
{
  public interface IUserRepository
  {
    Task        RegisterUserAsync(User user);
    Task<User?> GetByIdAsync     (Guid id);
    Task<User?> GetByEmailAsync  (string email);

    // userId is for verification (but it seems to me it is bad solution, 
    // the best solution will be comparing userId from token to cartBook userId)
    // Task UpdateCartBookAsync(int cartBookId, Guid userId, bool increase);

    Task AddLikedBookAsync   (Guid userId, int bookId);
    Task DeleteLikedBookAsync(Guid userId, int bookId);
    Task<ICollection<int>> GetUserLikedBooksIdsAsync(Guid userId);
  }
}