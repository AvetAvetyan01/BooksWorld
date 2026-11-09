using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Commands.UserCommands.AddLikedBook;

public class AddLikedBookCommandHandler
  (ApplicationDbContext dbContext) 
  : IRequestHandler<AddLikedBookCommand, int>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(AddLikedBookCommand command, CancellationToken cancellationToken)
  {
    var creatingResult = await _dbContext.LikedBooks.AddAsync(
      new LikedBook
      {
        UserId = command.UserId,
        BookId = command.BookId
      }, 
      cancellationToken);

    await _dbContext.SaveChangesAsync(cancellationToken);

    return creatingResult.Entity.Id;
  }
}