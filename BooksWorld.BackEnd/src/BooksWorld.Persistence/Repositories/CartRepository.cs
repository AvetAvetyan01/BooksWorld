using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Domain.Models;
using BooksWorld.Persistence.DataProviders;
using BooksWorld.Persistence.Repositories.Common;
using Microsoft.EntityFrameworkCore;

namespace BooksWorld.Persistence.Repositories;

public class CartRepository(ApplicationDbContext context)
  : StandartRepository<CartBook>(context), ICartRepository
{
  private readonly ApplicationDbContext _context = context;

  public async Task UpdateUserCartBookCountAsync(int cartBookId, bool isIncrease)
  {
    var cartBook = await _context.CartBooks.FirstOrDefaultAsync(cb => cb.Id == cartBookId);

    if (cartBook != null && cartBook.BookFormat == BookFormat.Paper)
      _ = isIncrease
        ? cartBook.Quantity++
        : cartBook.Quantity > 1
          ? cartBook.Quantity--
          : cartBook.Quantity;

    await _context.SaveChangesAsync();
  }

  public async Task<IEnumerable<CartBook>> GetUserCartBooksAsync(Guid userId) =>
  await Task.Run(() =>
  {
    var cartBooks = _context.CartBooks
      .Include(cb => cb.Subbook)
      .Where(cb => cb.UserId == userId)
      .OrderBy(cb => cb.Id);

    return cartBooks;
  });
}