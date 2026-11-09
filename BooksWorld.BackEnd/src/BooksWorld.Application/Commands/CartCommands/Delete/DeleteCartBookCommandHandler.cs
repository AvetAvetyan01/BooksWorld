using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace BooksWorld.Application.Commands.CartCommands.Delete;

public class DeleteCartBookCommandHandler
  (ApplicationDbContext dbContext) 
  : IRequestHandler<DeleteCartBookCommand, int>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle
    (DeleteCartBookCommand command, CancellationToken cancellationToken)
  {
    var cartBook = await _dbContext.CartBooks
      .FirstOrDefaultAsync(cb => cb.Id == command.CartBookId, cancellationToken)
      ?? throw new Exception($"CartBook Not Found By Given ID ${command.CartBookId}");

    var deletingResult = _dbContext.CartBooks.Remove(cartBook);

    await _dbContext.SaveChangesAsync(cancellationToken);
    
    return deletingResult.Entity.Id;
  }
}