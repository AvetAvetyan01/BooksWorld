using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Interfaces.Generics;
using BooksWorld.Domain.FiltrationModels;
using BooksWorld.Domain.Models.BookModels;

namespace BooksWorld.Domain.Interfaces.Repositories
{
  public interface IBookRepository : IRepository<Book>
  {
    Task<IQueryable<Book>> GetFilteredAsync(BooksFilter filter);
    // Task<IEnumerable<Book>> GetFilteredAsync(BooksFilter filter);

    Task<IEnumerable<Book>> GetOrderedAsync
      (IEnumerable<Book> books, SortingType sortingType, bool byDescending);
  }
}