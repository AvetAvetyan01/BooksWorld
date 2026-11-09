using BooksWorld.Domain.Enums;
using MediatR;

namespace BooksWorld.Application.Common.Requests.GetBySearch;

public record GetBySearchQuery<T>
(
  string Value
  // search type
) 
: IRequest<IEnumerable<T>>;