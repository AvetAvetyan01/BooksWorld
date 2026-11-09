using BooksWorld.Application.Common.Requests.Suggestions;
using BooksWorld.Domain.Enums.SearchTypes;

namespace BooksWorld.Application.Queries.GenreQueries.GetSuggestions;

public class GetGenresSuggestionsRequest : SuggestionsRequest
{
  public GenresSearchField  SearchField  { get; set; }
}