using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Domain.Models;
using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;

namespace BooksWorld.Persistence.Repositories;

public class UserRepository(ApplicationDbContext context) : IUserRepository
{
  private readonly ApplicationDbContext _context = context;

  public async Task RegisterUserAsync(User user)
  {
    await _context.Users.AddAsync(user);
    await _context.SaveChangesAsync();
  }
  
  public async Task<User?> GetByIdAsync(Guid id) =>
    await _context.Users
      // .Include(u => u.LikedBooks)
      // .Include(u => u.CartBooks)
      // .AsNoTracking()
      .FirstOrDefaultAsync(u => u.Id == id);

  public async Task<User?> GetByEmailAsync(string email) =>
    await _context.Users
      // .Include(u => u.LikedBooks)
      // .Include(u => u.CartBooks)
      // .AsNoTracking()
      .FirstOrDefaultAsync(u => u.Email == email);

  public async Task<ICollection<int>> GetUserLikedBooksIdsAsync(Guid userId)
  {
    var likedsIds = await Task.Run(() =>  
      _context.LikedBooks
        .Where(lb => lb.UserId == userId)
        .Select(lb => lb.BookId));

    return [..likedsIds];
  }

  public async Task AddLikedBookAsync(Guid userId, int bookId)
  {
    await _context.LikedBooks.AddAsync(
      new LikedBook
      {
        UserId = userId,
        BookId = bookId
      });

    await _context.SaveChangesAsync();
  }

  public async Task DeleteLikedBookAsync(Guid userId, int bookId)
  {
    var likedBook = await _context.LikedBooks
      .FirstOrDefaultAsync(b => b.UserId == userId && b.BookId == bookId);

    if (likedBook != null)
      await Task.Run(() => _context.LikedBooks.Remove(likedBook));

    await _context.SaveChangesAsync();
  }
}