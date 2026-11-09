using BooksWorld.Domain.Common;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace BooksWorld.Application.Commands.AuthorCommands.Create;

public sealed record CreateAuthorCommand
(
    IFormFile Image,
    string FullName_AM,
    string FullName_EN,
    string FullName_RU,
    string Autobiographical_AM,
    string Autobiographical_EN,
    string Autobiographical_RU
) : IRequest<int>;
