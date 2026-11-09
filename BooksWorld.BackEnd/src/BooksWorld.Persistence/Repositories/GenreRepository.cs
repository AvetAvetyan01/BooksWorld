using BooksWorld.Persistence.DataProviders;
using BooksWorld.Persistence.Repositories.Common;
using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Domain.FiltrationModels;
using BooksWorld.Domain.Models;
using BooksWorld.Domain.Enums;

namespace BooksWorld.Persistence.Repositories;

public class GenreRepository(ApplicationDbContext context)
  : StandartRepository<Genre>(context), IGenreRepository
{
  private readonly ApplicationDbContext _context = context;

  public async Task<IEnumerable<Genre>> GetFilteredAsync(GenresFilter filter) =>
    await Task.Run(() =>
    {
      var genres = _context.Genres.AsQueryable();

      if (!string.IsNullOrEmpty(filter.Search))
      {
        genres = filter.SearchField switch
        {
          GenresSearchField.Id => genres.Where(g => g.Id.ToString().Contains(filter.Search)),

          GenresSearchField.Name => filter.SearchLanguage switch
          {
            Language.Armenian => genres.Where(g => g.Name_AM.Contains(filter.Search, StringComparison.CurrentCultureIgnoreCase)),
            Language.English  => genres.Where(g => g.Name_EN.Contains(filter.Search, StringComparison.CurrentCultureIgnoreCase)),
            Language.Russian  => genres.Where(g => g.Name_RU.Contains(filter.Search, StringComparison.CurrentCultureIgnoreCase)),

            _ => genres
          },

          _ => genres
        };
      }

      return genres;
    });
}