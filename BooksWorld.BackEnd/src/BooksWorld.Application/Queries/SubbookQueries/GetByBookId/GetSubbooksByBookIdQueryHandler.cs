using BooksWorld.Domain.Models.BookModels;
using BooksWorld.Persistence.DataProviders;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BooksWorld.Application.Queries.SubbookQueries.GetByBookId;

public class GetSubbooksByBookIdQueryHanlder
  (ApplicationDbContext dbContext)
: IRequestHandler<GetSubbooksByBookIdQuery, IEnumerable<Subbook>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<IEnumerable<Subbook>> Handle
    (GetSubbooksByBookIdQuery query, CancellationToken cancellationToken) => await Task.Run(() =>
  {
    var subbooks = _dbContext.Subbooks
      .AsNoTracking()
      .Where(s => s.BookId == query.BookId);

    return subbooks;
  });
}