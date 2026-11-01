using MediatR;

namespace BooksWorld.Application.Commands.GenreCommands.Update;

public sealed record UpdateGenreCommand
(
  int Id,
  int BaseId,
  string Name_AM,
  string Name_EN,
  string Name_RU
) : IRequest<int>;
