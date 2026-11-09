using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Enums.SearchTypes;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Collections;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.OrderQueries.Get;

public class GetOrdersQueryHanlder
  (ApplicationDbContext dbContext) 
  : IRequestHandler<GetOrdersQuery, PagedCollection<Order>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<PagedCollection<Order>> Handle
    (GetOrdersQuery query, CancellationToken cancellationToken) => await Task.Run(() => 
  {
    var orders = _dbContext.Orders.AsNoTracking();

    if (!string.IsNullOrEmpty(query.Search))
    {
      orders = query.SearchField switch
      {
        OrderSearchType.Id => orders.Where(o => o.Id.ToString().Contains(query.Search)),
        OrderSearchType.UserId => orders.Where(o => o.UserId.ToString().Contains(query.Search)),
        _ => orders
      };
    }

    var pagedOrders = PagedCollection<Order>.Parse(orders, query.Page, query.Size);

    return pagedOrders;
  });
}