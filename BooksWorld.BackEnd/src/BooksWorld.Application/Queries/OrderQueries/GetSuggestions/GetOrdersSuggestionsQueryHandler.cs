using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Enums.SearchTypes;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.DTO;
using MediatR;

namespace BooksWorld.Application.Queries.OrderQueries.GetSuggestions;

public class GetOrdersSuggestionsQueryHandler
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetOrdersSuggestionsQuery, IEnumerable<OrderSuggestion>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public Task<IEnumerable<OrderSuggestion>> Handle
    (GetOrdersSuggestionsQuery query, CancellationToken cancellationToken)
  {
    if (string.IsNullOrEmpty(query.Search)) return Task.FromResult<IEnumerable<OrderSuggestion>>([]); 

    var orders = _dbContext.Orders.AsNoTracking();
  
    var filteredOrders = query.SearchField switch
    {
      OrderSearchType.Id => orders.Where(o => o.Id.ToString().Contains(query.Search)),
      OrderSearchType.UserId => orders.Where(o => o.UserId.ToString().Contains(query.Search)),
      _ => orders
    };   

    var suggestions = filteredOrders.Select(b => new BookSuggestion(b.Id, b.UserId.ToString()));

    suggestions = suggestions.Take(query.Size);

    return Task.FromResult((IEnumerable<OrderSuggestion>)suggestions);
  }
}