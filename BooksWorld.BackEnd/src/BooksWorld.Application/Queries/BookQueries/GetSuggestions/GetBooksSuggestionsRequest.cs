using BooksWorld.Application.Common.Requests.Suggestions;
using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Enums.SearchTypes;

namespace BooksWorld.Application.Queries.BookQueries.GetSuggestions;

public class GetBooksSuggestionsRequest : SuggestionsRequest
{
  public BooksSearchField SearchField { get; set; }
};