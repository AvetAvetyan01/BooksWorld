using Microsoft.AspNetCore.Http;

namespace BooksWorld.Application.Commands.AuthorCommands.Common;

public sealed record AuthorModelRequest
(
    IFormFile? Image,
    string FullName_AM,
    string FullName_EN,
    string FullName_RU,
    string Autobiographical_AM,
    string Autobiographical_EN,
    string Autobiographical_RU
);

