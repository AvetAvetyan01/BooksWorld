using Microsoft.AspNetCore.Http;

namespace BooksWorld.Application.Commands.AuthorCommands.Update;

public sealed record UpdateAuthorRequest 
(
    // int Id,
    IFormFile Image,
    string FullName,
    string ImageUrl,
    string Autobiographical
);
