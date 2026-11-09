using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Domain.DTO;
using MediatR;

namespace BooksWorld.Application.Queries.OrderQueries.GetSuggestions;

public class GetOrdersSuggestionsQuery : IRequest<IEnumerable<OrderSuggestion>>
{
  public string?          Search          { get; set; }
  public int              Size            { get; set; }
  public OrderSearchType  SearchField     { get; set; }
};