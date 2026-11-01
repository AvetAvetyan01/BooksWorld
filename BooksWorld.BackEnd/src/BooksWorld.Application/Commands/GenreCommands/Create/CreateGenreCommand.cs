using MediatR;

namespace BooksWorld.Application.Commands.GenreCommands.Create;

public sealed record CreateGenreCommand
(
    int BaseId,
    string Name_AM,
    string Name_EN,
    string Name_RU
) : IRequest<int>;