using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Models.BookModels;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BooksWorld.Application.Queries.BookQueries.GetByIds;

public class GetBooksByIdsQueryHandler
  (ApplicationDbContext dbContext) 
: IRequestHandler<GetBooksByIdsQuery, IEnumerable<Book>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<IEnumerable<Book>> Handle
    (GetBooksByIdsQuery query, CancellationToken cancellationToken) => await Task.Run(() => 
  {
    var books = _dbContext.Books
      .AsNoTracking()
      .Include(b => b.Author)
      .Where(b => query.BookIds.Contains(b.Id));

    return books;
  });
}