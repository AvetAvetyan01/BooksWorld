using BooksWorld.Domain.Models;
using BooksWorld.Persistence.DataProviders;
using MediatR;

namespace BooksWorld.Application.Queries.GenreQueries.GetByBaseId;

public class GetGenresByBaseIdQueryHandler 
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetGenresByBaseIdQuery, IEnumerable<Genre>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<IEnumerable<Genre>> Handle
    (GetGenresByBaseIdQuery query, CancellationToken cancellationToken) => await Task.Run(() => 
  {
    var genres = _dbContext.Genres.Where(g => g.BaseId == query.BaseId).AsEnumerable();

    return genres;
  });
}