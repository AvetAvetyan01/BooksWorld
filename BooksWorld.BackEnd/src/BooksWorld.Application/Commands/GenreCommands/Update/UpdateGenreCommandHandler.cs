using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Models;
using MapsterMapper;
using MediatR;

namespace BooksWorld.Application.Commands.GenreCommands.Update;

public class UpdateGenreCommandHandler
  (IMapper mapper, ApplicationDbContext dbContext) 
  : IRequestHandler<UpdateGenreCommand, int>
{
  private readonly IMapper _mapper = mapper;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(UpdateGenreCommand command, CancellationToken cancellationToken)
  {
    var genre = _mapper.Map<Genre>(command);

    var updatingResult = _dbContext.Genres.Update(genre);

    await _dbContext.SaveChangesAsync(cancellationToken);
    
    return updatingResult.Entity.Id;
  }
}
