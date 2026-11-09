using BooksWorld.Persistence.DataProviders;
using BooksWorld.Persistence.Repositories.Common;
using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Domain.Models.BookModels;
using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Domain.FiltrationModels;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Enums;

namespace BooksWorld.Persistence.Repositories;

public class BookRepository(ApplicationDbContext context) 
  : StandartRepository<Book>(context), IBookRepository
{
  private readonly ApplicationDbContext _context = context;
  
  public async Task<IQueryable<Book>> GetFilteredAsync(BooksFilter filter) => await Task.Run(() => 
  {
    var books = _context.Books
      .AsNoTracking()
      .Include(b => b.Author)
      .AsSplitQuery();
    
    // books = books.Where(b => b.Formats != 0);
    
    if (filter.AuthorId != null)
      books = books.Where(b => b.Author.Id == filter.AuthorId);

    if (filter.GenreId > 1)
    {
      books = books
        .Include(b => b.Genre)
        .Where(b => b.Genre.Id == filter.GenreId || b.Genre.BasesIds.Contains(filter.GenreId));
    }

    if (filter.HighRated)
      books = books.Where(b => b.Rating >= 3); // 4 in future

    if (filter.Discounted)
      books = books.Where(b => b.DiscountPercent != null);

    if (filter.Languages != null)
      books = books.Where(b => b.Languages.HasFlag(filter.Languages));

    if (filter.Formats != null)
      books = books.Where(b => b.Formats.HasFlag(filter.Formats));

    if (!string.IsNullOrEmpty(filter.Search))
      books = filter.SearchField switch
      {
        BooksSearchField.Id => books.Where(b => b.Id.ToString().Contains(filter.Search)),

        BooksSearchField.Title => filter.SearchLanguage switch
        {
          Language.Armenian => books.Where(b => EF.Functions.ILike(b.Title_AM, $"%{filter.Search}%")),
          Language.English  => books.Where(b => EF.Functions.ILike(b.Title_EN, $"%{filter.Search}%")),
          Language.Russian  => books.Where(b => EF.Functions.ILike(b.Title_RU, $"%{filter.Search}%")),
          
          _ => books
        },
        // BooksSearchType.ISBN
        _ => books
      };

    return books;
  });

  public async Task<IEnumerable<Book>> GetOrderedAsync
    (IEnumerable<Book> books, SortingType sortingType, bool byAscending) =>
      await Task.Run(() =>
        sortingType switch
        {
          SortingType.Newest =>
            byAscending
              ? books.OrderBy(b => b.Rating)
              : books.OrderByDescending(b => b.Rating),

          SortingType.Rating =>
            byAscending
              // ? books.OrderBy(b => b.Rating)
              ? books.OrderBy(b => b.Id)
              : books.OrderByDescending(b => b.Rating),
              
          _ => books,
        });

  public override async Task<Book?> GetByIdAsync(int id) => 
    await _context.Books
      .AsNoTracking()
      .Include(c => c.Author)
      .Include(c => c.Genre)
      .Include(c => c.Subbooks)
      .FirstOrDefaultAsync(b => b.Id == id);

  public override async Task<IEnumerable<Book>> GetAllAsync() =>
    await Task.Run(() =>
    {
      var books = _context.Books
        .Include(b => b.Author)
        .AsNoTracking();

      return books;
    });
}