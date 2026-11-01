using BooksWorld.Application.Common.Requests.Pagination;
using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Domain.Collections;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.OrderQueries.Get;

public sealed class GetOrdersQuery
  : PaginationRequest, IRequest<PagedCollection<Order>>
{
  public string?            Search       { get; set; }
  public OrderSearchType?   SearchField  { get; set; }
}