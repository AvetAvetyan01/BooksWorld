using BooksWorld.Domain.DTO;
using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Enums.SearchTypes;
using MediatR;

namespace BooksWorld.Application.Queries.BookQueries.GetSuggestions;

public class GetBooksSuggestionsQuery : IRequest<IEnumerable<BookSuggestion>>
{
  public string?          Search          { get; set; }
  public int              Size            { get; set; }
  public Language         SearchLanguage  { get; set; }
  public BooksSearchField SearchField     { get; set; }
};