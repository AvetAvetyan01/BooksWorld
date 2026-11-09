using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Domain.Collections;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.DTO.Cards;
using BooksWorld.Domain.Enums;
using MediatR;

namespace BooksWorld.Application.Queries.GenreQueries.Get;

public class GetGenresQueryHandler
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetGenresQuery, PagedCollection<GenreCard>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<PagedCollection<GenreCard>> 
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

    var genreCards = query.Language switch
    {
      Language.Armenian => genres.Select(g => new GenreCard(g.Id, g.Name_AM)),
      Language.English  => genres.Select(g => new GenreCard(g.Id, g.Name_EN)),
      Language.Russian  => genres.Select(g => new GenreCard(g.Id, g.Name_RU)),

      _ => genres.Select(g => new GenreCard(g.Id, g.Name_EN))
    };

    var pagedGenres = PagedCollection<GenreCard>.Parse(genreCards, query.Page, (int)query.Size);

    return pagedGenres;
  });
}