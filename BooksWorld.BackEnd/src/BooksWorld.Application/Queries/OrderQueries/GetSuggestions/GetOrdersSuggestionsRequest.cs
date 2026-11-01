using BooksWorld.Application.Common.Requests.Suggestions;
using BooksWorld.Domain.Enums.SearchTypes;

namespace BooksWorld.Application.Queries.OrderQueries.GetSuggestions;

public class GetOrdersSuggestionsRequest : SuggestionsRequest
{
  public OrderSearchType SearchField { get; set; }
};