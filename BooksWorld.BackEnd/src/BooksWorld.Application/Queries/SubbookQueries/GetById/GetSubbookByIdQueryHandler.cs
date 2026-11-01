using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Domain.Models.BookModels;
using BooksWorld.Persistence.DataProviders;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BooksWorld.Application.Queries.SubbookQueries.GetById;

public class GetSubbookByIdQueryHanlder
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetSubbookByIdQuery, Subbook?>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<Subbook?> Handle(GetSubbookByIdQuery query, CancellationToken cancellationToken)
  {
    var subbook = await _dbContext.Subbooks
      .AsNoTracking()
      .FirstOrDefaultAsync(s => s.Id == query.Id, cancellationToken);

    return subbook;
  }
}