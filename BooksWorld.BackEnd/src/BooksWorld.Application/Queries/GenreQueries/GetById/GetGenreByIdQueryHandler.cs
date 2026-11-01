using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Domain.Models;
using BooksWorld.Persistence.DataProviders;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BooksWorld.Application.Queries.GenreQueries.GetById;

public class GetGenreByIdQueryHandler
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetGenreByIdQuery, Genre?>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<Genre?> Handle(GetGenreByIdQuery query, CancellationToken cancellationToken)
  {
    var genre = await _dbContext.Genres
      .AsNoTracking()
      .FirstOrDefaultAsync(g => g.Id == query.Id, cancellationToken);

    return genre;
  }
}
