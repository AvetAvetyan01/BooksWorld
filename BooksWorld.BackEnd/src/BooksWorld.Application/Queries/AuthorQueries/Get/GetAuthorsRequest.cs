using BooksWorld.Domain.FiltrationModels;

namespace BooksWorld.Application.Queries.AuthorQueries.Get;

public sealed class GetAuthorsRequest : AuthorsFilter
{
  public int Page { get; set; }
  public int Size { get; set; } 
}