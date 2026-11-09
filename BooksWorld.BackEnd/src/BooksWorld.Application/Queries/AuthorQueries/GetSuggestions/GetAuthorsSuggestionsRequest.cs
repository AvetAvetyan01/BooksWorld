using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Application.Common.Requests.Suggestions;

namespace BooksWorld.Application.Queries.AuthorQueries.GetSuggestions;

public class GetAuthorsSuggestionsRequest : SuggestionsRequest
{
  public AuthorsSearchField SearchField { get; set; }
}