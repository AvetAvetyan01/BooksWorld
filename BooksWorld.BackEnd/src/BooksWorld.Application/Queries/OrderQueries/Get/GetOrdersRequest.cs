using BooksWorld.Application.Common.Requests.Pagination;
using BooksWorld.Domain.Enums.SearchTypes;

namespace BooksWorld.Application.Queries.OrderQueries.Get;

public sealed class GetOrdersRequest : PaginationRequest
{
  public string?            Search       { get; set; }
  public OrderSearchType?   SearchField  { get; set; }
}