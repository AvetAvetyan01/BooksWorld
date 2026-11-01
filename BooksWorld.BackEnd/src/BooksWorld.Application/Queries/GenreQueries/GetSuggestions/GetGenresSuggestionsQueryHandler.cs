using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Enums.SearchTypes;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.DTO;
using BooksWorld.Domain.Enums;
using MediatR;

namespace BooksWorld.Application.Queries.GenreQueries.GetSuggestions;

public class GetGenresSuggestionsQueryHandler
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetGenresSuggestionsQuery, IEnumerable<GenreSuggestion>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public Task<IEnumerable<GenreSuggestion>> Handle
    (GetGenresSuggestionsQuery query, CancellationToken cancellationToken) 
  {
    if (query.Search == null) return Task.FromResult<IEnumerable<GenreSuggestion>>([]); 
    
    // IQueryable<GenreSuggestion> suggestions = query.SearchLanguage switch
    // {
    //   Language.Armenian => _dbContext.Genres.AsNoTracking().Select(a => new GenreSuggestion(a.Id, a.Name_AM)),
    //   Language.English  => _dbContext.Genres.AsNoTracking().Select(a => new GenreSuggestion(a.Id, a.Name_EN)),
    //   Language.Russian  => _dbContext.Genres.AsNoTracking().Select(a => new GenreSuggestion(a.Id, a.Name_RU)),
    //   _ => _dbContext.Genres.AsNoTracking().Select(b => new GenreSuggestion(b.Id, b.Name_EN))
    // };

    // if (!string.IsNullOrEmpty(query.Search))
    //   suggestions = query.SearchField switch
    //   {
    //     GenresSearchField.Name => suggestions
    //       .Where(g => g.Name.Contains(query.Search, StringComparison.CurrentCultureIgnoreCase)),

    //     GenresSearchField.Id => suggestions
    //       .Where(g => g.Id.ToString().Contains(query.Search)),
          
    //     _ => suggestions
    //   };

    var genres = _dbContext.Genres.AsNoTracking();
  
    var filteredGenres = query.SearchField switch
    {
      GenresSearchField.Id => genres.Where(b => b.Id.ToString().Contains(query.Search)),
      GenresSearchField.Name => query.SearchLanguage switch
      {
        Language.Armenian => genres.Where(b => EF.Functions.ILike(b.Name_AM, $"%{query.Search}%")),
        Language.English  => genres.Where(b => EF.Functions.ILike(b.Name_EN, $"%{query.Search}%")),
        Language.Russian  => genres.Where(b => EF.Functions.ILike(b.Name_RU, $"%{query.Search}%")),
        _ => genres
      },
      _ => genres
    };   

    IQueryable<GenreSuggestion> suggestions = query.SearchLanguage switch
    {
      Language.Armenian => filteredGenres.Select(b => new GenreSuggestion(b.Id, b.Name_AM)),
      Language.English  => filteredGenres.Select(b => new GenreSuggestion(b.Id, b.Name_EN)),
      Language.Russian  => filteredGenres.Select(b => new GenreSuggestion(b.Id, b.Name_RU)),
      _ => filteredGenres.Select(b => new GenreSuggestion(b.Id, b.Name_EN))
    };

    suggestions = suggestions.Take(query.Size);

    return Task.FromResult<IEnumerable<GenreSuggestion>>(suggestions);
  }
}