namespace BooksWorld.Application.Commands.GenreCommands.Update;

public sealed record UpdateGenreRequest
(
    string Name,
    int? BaseId
);
