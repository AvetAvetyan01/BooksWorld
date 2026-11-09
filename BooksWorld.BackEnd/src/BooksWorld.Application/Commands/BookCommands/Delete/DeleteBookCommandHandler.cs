using BooksWorld.Application.Commands.SubbookCommands.Delete;
using BooksWorld.Persistence.DataProviders;
using BooksWorld.Application.Common.Constants;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace BooksWorld.Application.Commands.BookCommands.Delete;

public class DeleteBookCommandHandler(
  IMediator mediator,
  Supabase.Client supabaseClient,
  ApplicationDbContext dbContext 
) : IRequestHandler<DeleteBookCommand, int>
{
  private readonly IMediator _mediator = mediator;
  private readonly Supabase.Client _supabaseClient = supabaseClient;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(DeleteBookCommand command, CancellationToken cancellationToken)
  {
    var book = await _dbContext.Books.FirstOrDefaultAsync(b => b.Id == command.Id, cancellationToken)
      ?? throw new Exception($"Book Not Found By Given ID ({command.Id})");

    var deletableSubbooksIds = await _dbContext.Subbooks
      .Where(s => s.BookId == book.Id)
      .Select(s => s.Id)
      .ToListAsync(cancellationToken);

    foreach(var subbookId in deletableSubbooksIds)
      await _mediator.Send(new DeleteSubbookCommand(subbookId),cancellationToken);

    var deletingResult = _dbContext.Books.Remove(book);

    await _supabaseClient.Storage
      .From(SupabaseBucketsNames.Public)
      .Remove(book.ImagePath);

    await _dbContext.SaveChangesAsync(cancellationToken);

    return deletingResult.Entity.Id;
  }
}