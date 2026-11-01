using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace BooksWorld.Application.Commands.UserCommands.DeleteLikedBook;

public class DeleteLikedBookCommandHandler
  (ApplicationDbContext dbContext) 
  : IRequestHandler<DeleteLikedBookCommand, int>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(DeleteLikedBookCommand command, CancellationToken cancellationToken)
  {
    var likedBook = await _dbContext.LikedBooks
      .FirstOrDefaultAsync(b => b.UserId == command.UserId && b.BookId == command.BookId, cancellationToken)
      ?? throw new Exception($"Book Not Found By Given ID ({command.BookId})");

    var deletingResult = _dbContext.LikedBooks.Remove(likedBook);
       
    await _dbContext.SaveChangesAsync(cancellationToken);

    return deletingResult.Entity.Id;
  }
}