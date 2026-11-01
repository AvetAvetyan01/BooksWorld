using MediatR;

namespace BooksWorld.Application.Commands.GenreCommands.Delete;

public sealed record DeleteGenreCommand(int Id) : IRequest<int>;
