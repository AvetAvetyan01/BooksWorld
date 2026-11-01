using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using MapsterMapper;
using MediatR;

namespace BooksWorld.Application.Commands.GenreCommands.Create;

public class CreateGenreCommandHandler
  (IMapper mapper, ApplicationDbContext dbContext)
  : IRequestHandler<CreateGenreCommand, int>
{
  private readonly IMapper _mapper = mapper;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(CreateGenreCommand command, CancellationToken cancellationToken)
  {
    var baseGenre = await _dbContext.Genres.FirstOrDefaultAsync(g => g.Id == command.BaseId, cancellationToken)
      ?? throw new Exception($"Base Genre Not Found By Given ID ({command.BaseId})");

    baseGenre.SubgenresCount++;

    var genre = _mapper.Map<Genre>(command);

    genre.BasesIds = [..baseGenre.BasesIds, baseGenre.Id];

    var creatingResult = await _dbContext.Genres.AddAsync(genre, cancellationToken);

    await _dbContext.SaveChangesAsync(cancellationToken);

    return creatingResult.Entity.Id;
  }
}
