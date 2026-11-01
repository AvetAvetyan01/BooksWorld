using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Enums.SearchTypes;

namespace BooksWorld.Domain.FiltrationModels;

public class BooksFilter
{
    public string?          Search           { get; set; }
    public Language         SearchLanguage   { get; set; }
    public BooksSearchField SearchField      { get; set; } = BooksSearchField.Title;
    public int?             AuthorId         { get; set; }
    public int              GenreId          { get; set; } = 1;
    public bool             HighRated        { get; set; }
    public bool             Discounted       { get; set; }
    public Language?        Languages        { get; set; }
    public BookFormat?      Formats          { get; set; }
}
