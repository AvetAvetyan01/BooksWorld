using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Enums.SearchTypes;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Enums;
using BooksWorld.Domain.DTO;
using MediatR;

namespace BooksWorld.Application.Queries.BookQueries.GetSuggestions;

public class GetBooksSuggestionsQueryHandler(ApplicationDbContext dbContext)
  : IRequestHandler<GetBooksSuggestionsQuery, IEnumerable<BookSuggestion>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public Task<IEnumerable<BookSuggestion>> Handle(GetBooksSuggestionsQuery query, CancellationToken cancellationToken)
  {
    if (query.Search == null) return Task.FromResult<IEnumerable<BookSuggestion>>([]); 

    var books = _dbContext.Books.AsNoTracking();
  
    var filteredBooks = query.SearchField switch
    {
      BooksSearchField.Id => books.Where(b => b.Id.ToString().Contains(query.Search)),
      BooksSearchField.Title => query.SearchLanguage switch
      {
        Language.Armenian => books.Where(b => EF.Functions.ILike(b.Title_AM, $"%{query.Search}%")),
        Language.English  => books.Where(b => EF.Functions.ILike(b.Title_EN, $"%{query.Search}%")),
        Language.Russian  => books.Where(b => EF.Functions.ILike(b.Title_RU, $"%{query.Search}%")),
        _ => books
      },
      // BooksSearchField.ISBN => throw new NotImplementedException(),
      _ => books
    };   

    var suggestions = query.SearchLanguage switch
    {
      Language.Armenian => filteredBooks.Select(b => new BookSuggestion(b.Id, b.Title_AM)),
      Language.English  => filteredBooks.Select(b => new BookSuggestion(b.Id, b.Title_EN)),
      Language.Russian  => filteredBooks.Select(b => new BookSuggestion(b.Id, b.Title_RU)),
      _ => filteredBooks.Select(b => new BookSuggestion(b.Id, b.Title_EN))
    };

    suggestions = suggestions.Take(query.Size);

    return Task.FromResult<IEnumerable<BookSuggestion>>(suggestions);
  }
}