using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Enums.SearchTypes;

namespace BooksWorld.Domain.FiltrationModels;

public class AuthorsFilter
{
  public string?            Search            { get; set; }
  public AuthorsSearchField SearchField       { get; set; } = AuthorsSearchField.FullName;
  public Language           SearchLanguage    { get; set; }
}