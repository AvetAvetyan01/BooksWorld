using BooksWorld.Domain.DTO;
using MediatR;
using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Enums.SearchTypes;

namespace BooksWorld.Application.Queries.AuthorQueries.GetSuggestions;

public class GetAuthorSuggestionsQuery : IRequest<IEnumerable<AuthorSuggestion>>
{
  public string?            Search            { get; set; }
  public Language           SearchLanguage    { get; set; }
  public AuthorsSearchField SearchField       { get; set; }
  public int                Size              { get; set; }
}