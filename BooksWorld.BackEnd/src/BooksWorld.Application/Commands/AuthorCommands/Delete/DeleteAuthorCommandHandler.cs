using BooksWorld.Application.Commands.BookCommands.Delete;
using BooksWorld.Persistence.DataProviders;
using BooksWorld.Application.Common.Constants;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace BooksWorld.Application.Commands.AuthorCommands.Delete;

public class DeleteAuthorCommandHandler(
  IMediator mediator,
  Supabase.Client supabaseClient,
  ApplicationDbContext dbContext
) : IRequestHandler<DeleteAuthorCommand, int>
{
  private readonly IMediator _mediator = mediator;
  private readonly Supabase.Client _supabaseClient = supabaseClient;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(DeleteAuthorCommand command, CancellationToken cancellationToken)
  {
    var author = await _dbContext.Authors.FirstOrDefaultAsync(a => a.Id == command.Id, cancellationToken)
      ?? throw new Exception($"Author Not Found By Given Id ({command.Id})");

    var deletableBooksIds = await _dbContext.Books
      .Include(b => b.Author)
      .Where(b => b.Author.Id == command.Id)
      .Select(b => b.Id)
      .ToListAsync(cancellationToken);
    
    foreach(var bookId in deletableBooksIds)
      await _mediator.Send(new DeleteBookCommand(bookId), cancellationToken);

    var deletingResult = _dbContext.Authors.Remove(author);

    await _supabaseClient.Storage
      .From(SupabaseBucketsNames.Public)
      .Remove(author.ImagePath);

    await _dbContext.SaveChangesAsync(cancellationToken);
    
    return deletingResult.Entity.Id;
  }
}
