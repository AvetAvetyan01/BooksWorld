namespace BooksWorld.Application.Commands.AuthorCommands.Create;

public sealed record CreateAuthorRequest
(
    string FullName,
    string ImageUrl,
    string Autobiographical
);

