using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Collections;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using MediatR;
using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Domain.Enums;

namespace BooksWorld.Application.Queries.GenreQueries.Get;

public class GetGenresQueryHandler
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetGenresQuery, PagedCollection<Genre>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<PagedCollection<Genre>> 
    Handle(GetGenresQuery query, CancellationToken cancellationToken) => await Task.Run(() =>
  {
    var genres = _dbContext.Genres.AsNoTracking();

    if (query.BaseId != null) 
      genres = genres.Where(g => g.Id == query.BaseId);

    if (!string.IsNullOrEmpty(query.Search))
    {
      genres = query.SearchType switch
      {
        GenresSearchField.Id => genres.Where(g => g.Id.ToString().Contains(query.Search)),

        GenresSearchField.Name => query.Language switch
        {
          Language.Armenian => genres.Where(g => g.Name_AM.Contains(query.Search, StringComparison.CurrentCultureIgnoreCase)),
          Language.English  => genres.Where(g => g.Name_EN.Contains(query.Search, StringComparison.CurrentCultureIgnoreCase)),
          Language.Russian  => genres.Where(g => g.Name_RU.Contains(query.Search, StringComparison.CurrentCultureIgnoreCase)),
         _ => genres 
        },

        _ => genres
      };
    }

    var pagedGenres = PagedCollection<Genre>.Parse(genres, query.Page, (int)query.Size);

    return pagedGenres;
  });
}