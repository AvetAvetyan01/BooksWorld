using BooksWorld.Domain.Enums;
using BooksWorld.Persistence.DataProviders;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BooksWorld.Application.Commands.CartCommands.UpdateCount;

public class UpdateCartBookCountCommandHandler
  (ApplicationDbContext dbContext) 
  : IRequestHandler<UpdateCartBookCountCommand, int>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(UpdateCartBookCountCommand command, CancellationToken cancellationToken)
  {
    var cartBook = await _dbContext.CartBooks.FirstOrDefaultAsync(cb => cb.Id == command.CartBookId, cancellationToken)
      ?? throw new Exception($"Cart Book Not Found By Given ID ({command.CartBookId})");

    if (cartBook != null && cartBook.BookFormat == BookFormat.Paper)
      _ = command.Increase
        ? cartBook.Quantity++
        : cartBook.Quantity > 1
          ? cartBook.Quantity--
          : cartBook.Quantity;

    await _dbContext.SaveChangesAsync(cancellationToken);

    return command.CartBookId;
  }
}