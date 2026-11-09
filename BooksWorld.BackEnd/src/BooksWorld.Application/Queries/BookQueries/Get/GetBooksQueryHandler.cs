using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Collections;
using BooksWorld.Domain.DTO.Cards;
using BooksWorld.Domain.Enums;
using MediatR;
using BooksWorld.Domain.Models.BookModels;

namespace BooksWorld.Application.Queries.BookQueries.Get;

public class GetBooksQueryHandler(IBookRepository bookRepository, ApplicationDbContext context)
  : IRequestHandler<GetBooksQuery, PagedCollection<BookCard>>
{
  private readonly IBookRepository _bookRepository = bookRepository;
  private readonly ApplicationDbContext _context = context;

  public async Task<PagedCollection<BookCard>> Handle
    (GetBooksQuery query, CancellationToken cancellationToken)
  {
    var books = _context.Books
      .AsNoTracking()
      .Include(b => b.Author)
      .AsSplitQuery();
    
    // books = books.Where(b => b.Formats != 0);
    
    if (query.Filter.AuthorId != null)
      books = books.Where(b => b.Author.Id == query.Filter.AuthorId);

    if (query.Filter.GenreId > 1)
    {
      books = books
        .Include(b => b.Genre)
        .Where(b => b.Genre.Id == query.Filter.GenreId || b.Genre.BasesIds.Contains(query.Filter.GenreId));
    }

    if (query.Filter.HighRated)
      books = books.Where(b => b.Rating >= 3); // 4 in future

    if (query.Filter.Discounted)
      books = books.Where(b => b.DiscountPercent != null);

    if (query.Filter.Languages != null)
      books = books.Where(b => b.Languages.HasFlag(query.Filter.Languages));

    if (query.Filter.Formats != null)
      books = books.Where(b => b.Formats.HasFlag(query.Filter.Formats));
    
    if (!string.IsNullOrEmpty(query.Filter.Search))
      books = query.Filter.SearchField switch
      {
        BooksSearchField.Id => books.Where(b => b.Id.ToString().Contains(query.Filter.Search)),

        BooksSearchField.Title => query.Filter.SearchLanguage switch
        {
          Language.Armenian => books.Where(b => EF.Functions.ILike(b.Title_AM, $"%{query.Filter.Search}%")),
          Language.English  => books.Where(b => EF.Functions.ILike(b.Title_EN, $"%{query.Filter.Search}%")),
          Language.Russian  => books.Where(b => EF.Functions.ILike(b.Title_RU, $"%{query.Filter.Search}%")),
          
          _ => books
        },
        // BooksSearchType.ISBN
        _ => books
      };

    books = query.SortBy switch
    {
      SortingType.Newest =>
        query.ByAscending
          ? books.OrderBy(b => b.Rating)
          : books.OrderByDescending(b => b.Rating),

      SortingType.Rating =>
        query.ByAscending
          ? books.OrderBy(b => b.Rating)
          : books.OrderByDescending(b => b.Rating),

      SortingType.Id =>
        query.ByAscending
          ? books.OrderBy(b => b.Id)
          : books.OrderByDescending(b => b.Id),
          
      _ => books
    };

    var bookCards = query.Filter.SearchLanguage switch
    {
      Language.Armenian => 
        books.Select(b => new BookCard(b.Id, b.ImagePath, b.Title_AM, b.Author.Id, b.Author.FullName_AM, b.Rating, b.DiscountPercent, b.Languages, b.Formats)),
      Language.English => 
        books.Select(b => new BookCard(b.Id, b.ImagePath, b.Title_EN, b.Author.Id, b.Author.FullName_EN, b.Rating, b.DiscountPercent, b.Languages, b.Formats)),
      Language.Russian => 
        books.Select(b => new BookCard(b.Id, b.ImagePath, b.Title_RU, b.Author.Id, b.Author.FullName_RU, b.Rating, b.DiscountPercent, b.Languages, b.Formats)),
      _ => 
        books.Select(b => new BookCard(b.Id, b.ImagePath, b.Title_EN, b.Author.Id, b.Author.FullName_EN, b.Rating, b.DiscountPercent, b.Languages, b.Formats)),
    };

    var pagedBooksCards = PagedCollection<BookCard>.Parse(bookCards, query.Page, query.Size);

    return pagedBooksCards;
  }
}