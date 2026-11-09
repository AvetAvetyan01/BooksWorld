using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Enums.SearchTypes;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Enums;
using BooksWorld.Domain.DTO;
using MediatR;

namespace BooksWorld.Application.Queries.AuthorQueries.GetSuggestions;

public class GetAuthorsSuggestionsQueryHandler
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetAuthorSuggestionsQuery, IEnumerable<AuthorSuggestion>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public Task<IEnumerable<AuthorSuggestion>> Handle
    (GetAuthorSuggestionsQuery query, CancellationToken cancellationToken)  
  {
    // - we need to validate search string
    if (string.IsNullOrEmpty(query.Search)) return Task.FromResult<IEnumerable<AuthorSuggestion>>([]);

    var genres = _dbContext.Authors.AsNoTracking();
  
    var filteredGenres = query.SearchField switch
    {
      AuthorsSearchField.Id => genres.Where(b => b.Id.ToString().Contains(query.Search)),
      AuthorsSearchField.FullName => query.SearchLanguage switch
      {
        Language.Armenian => genres.Where(b => EF.Functions.ILike(b.FullName_AM, $"%{query.Search}%")),
        Language.English  => genres.Where(b => EF.Functions.ILike(b.FullName_EN, $"%{query.Search}%")),
        Language.Russian  => genres.Where(b => EF.Functions.ILike(b.FullName_RU, $"%{query.Search}%")),
        _ => genres
      },
      _ => genres
    };   

    IQueryable<AuthorSuggestion> suggestions = query.SearchLanguage switch
    {
      Language.Armenian => filteredGenres.Select(b => new AuthorSuggestion(b.Id, b.FullName_AM)),
      Language.English  => filteredGenres.Select(b => new AuthorSuggestion(b.Id, b.FullName_EN)),
      Language.Russian  => filteredGenres.Select(b => new AuthorSuggestion(b.Id, b.FullName_RU)),
      _ => filteredGenres.Select(b => new AuthorSuggestion(b.Id, b.FullName_EN))
    };

    suggestions = suggestions.Take(query.Size);
    
    return Task.FromResult<IEnumerable<AuthorSuggestion>>(suggestions);
  }
}