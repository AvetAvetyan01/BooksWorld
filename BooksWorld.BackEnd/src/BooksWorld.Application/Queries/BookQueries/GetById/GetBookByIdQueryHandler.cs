using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Models.BookModels;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace BooksWorld.Application.Queries.BookQueries.GetById;

public class GetBookByIdQueryHandler
  (ApplicationDbContext dbContext) 
  : IRequestHandler<GetBookByIdQuery, Book?>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<Book?> Handle(GetBookByIdQuery query, CancellationToken cancellationToken)
  {
    var book = await _dbContext.Books
      .AsNoTracking()
      .Include(b => b.Author)
      .Include(b => b.Genre)
      .FirstOrDefaultAsync(b => b.Id == query.Id, cancellationToken);

    return book;
  }
}