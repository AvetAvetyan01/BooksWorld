using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Domain.Enums;
using BooksWorld.Domain.DTO;
using MediatR;

namespace BooksWorld.Application.Queries.GenreQueries.GetSuggestions;

public class GetGenresSuggestionsQuery : IRequest<IEnumerable<GenreSuggestion>>
{
  public string?            Search          { get; set; }
  public int                Size            { get; set; }
  public Language           SearchLanguage  { get; set; }
  public GenresSearchField  SearchField     { get; set; }
}