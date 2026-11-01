using BooksWorld.Domain.Interfaces.Requests;

namespace BooksWorld.Application.Common.Requests.Pagination;

public class PaginationRequest : IPaginationRequest
{
  public int  Page   { get; set; }
  public int  Size   { get; set; }
}
