using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Enums.SearchTypes;

namespace BooksWorld.Domain.FiltrationModels;

public class GenresFilter
{
  public string?            Search          { get; set; }
  public int                Size            { get; set; }
  public Language           SearchLanguage  { get; set; }
  public GenresSearchField  SearchField     { get; set; }
}