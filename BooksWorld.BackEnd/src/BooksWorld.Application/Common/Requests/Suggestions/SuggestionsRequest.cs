using BooksWorld.Domain.Enums;

namespace BooksWorld.Application.Common.Requests.Suggestions;

public class SuggestionsRequest
{
  public string?  Search          { get; set; }
  public Language SearchLanguage  { get; set; }
  public int      Size            { get; set; }
}