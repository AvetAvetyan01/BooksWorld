using BooksWorld.Domain.Interfaces.Generics;
using BooksWorld.Domain.Models;

namespace BooksWorld.Domain.Interfaces.Repositories;

public interface ICartRepository : IRepository<CartBook>
{ 
  Task UpdateUserCartBookCountAsync(int cartBookId, bool isIncrease);
  Task<IEnumerable<CartBook>> GetUserCartBooksAsync(Guid userId);
}