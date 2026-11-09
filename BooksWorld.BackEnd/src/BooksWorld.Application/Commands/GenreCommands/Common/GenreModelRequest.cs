namespace BooksWorld.Application.Commands.GenreCommands.Common;

public sealed record GenreModelRequest
(
  int BaseId,
  string Name_AM,
  string Name_EN,
  string Name_RU
);
