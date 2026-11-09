using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.OrderQueries.GetById;

public class GetOrderByIdQueryHandler
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetOrderByIdQuery, Order?>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<Order?> Handle(GetOrderByIdQuery query, CancellationToken cancellationToken)
  {
    var order = await _dbContext.Orders
      .Include(o => o.OrderItems)
      .FirstOrDefaultAsync(o => o.Id == query.Id, cancellationToken)
      ?? throw new Exception($"Order Not Found By Given Id (Id: {query.Id})");

    return order;
  }
}
