using BooksWorld.Domain.Enums;

namespace BooksWorld.Domain.Interfaces.Requests;

public interface IPaginationRequest
{
  int         Page        { get; set; }
  int         Size        { get; set; }
}