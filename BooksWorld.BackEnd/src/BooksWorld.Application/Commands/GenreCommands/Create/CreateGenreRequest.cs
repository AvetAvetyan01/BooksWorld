namespace BooksWorld.Application.Commands.GenreCommands.Create;

public sealed record CreateGenreRequest
(
    string Name,
    int? BaseId
);
