using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace BooksWorld.Application.Commands.GenreCommands.Delete;

public class DeleteGenreCommandHandler
  (ApplicationDbContext dbContext) : IRequestHandler<DeleteGenreCommand, int>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(DeleteGenreCommand query, CancellationToken cancellationToken)
  {
    var genre = await _dbContext.Genres.FirstOrDefaultAsync(g => g.Id == query.Id, cancellationToken)
      ?? throw new Exception($"Genre Not Found By Given Id ({query.Id})");
    
    var baseGenre = await _dbContext.Genres.FirstOrDefaultAsync(g => g.Id == genre.BaseId, cancellationToken)
      ?? throw new Exception($"Base Genre Not Found By Given Id ({genre.BaseId})");

    var genreBooks = _dbContext.Books.Include(b => b.Genre).Where(b => b.Genre.Id == genre.Id);

    baseGenre.SubgenresCount--;

    await genreBooks.ForEachAsync(b => b.Genre = baseGenre, cancellationToken);

    var subgenres = _dbContext.Genres.Where(g => g.BaseId == query.Id);

    _dbContext.Genres.RemoveRange(subgenres);

    var deletingResult = _dbContext.Genres.Remove(genre);

    await _dbContext.SaveChangesAsync(cancellationToken);

    return deletingResult.Entity.Id;
  }
}
