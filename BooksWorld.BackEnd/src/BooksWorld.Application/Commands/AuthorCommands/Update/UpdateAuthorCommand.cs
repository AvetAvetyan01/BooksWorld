using Microsoft.AspNetCore.Http;
using MediatR;

namespace BooksWorld.Application.Commands.AuthorCommands.Update;

public sealed record UpdateAuthorCommand
(
  IFormFile?  Image,
  int         Id,
  string      FullName_AM,
  string      FullName_EN,
  string      FullName_RU,
  string      Autobiographical_AM,
  string      Autobiographical_EN,
  string      Autobiographical_RU
) : IRequest<int>;