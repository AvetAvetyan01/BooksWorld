using BooksWorld.Domain.Enums;
using BooksWorld.Domain.FiltrationModels;
using BooksWorld.Domain.Interfaces.Requests;

namespace BooksWorld.Application.Queries.BookQueries.Get;

public sealed class GetBooksRequest : BooksFilter, IPaginationRequest
{
  public int          Page        { get; set; } = 1;
  public int          Size        { get; set; } = 15;
  public SortingType  SortBy      { get; set; } = SortingType.Rating;
  public bool         ByAscending { get; set; } = false;
}