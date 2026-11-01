using MediatR;

namespace BooksWorld.Application.Commands.BookCommands.Delete;

public sealed record DeleteBookCommand(int Id) : IRequest<int>;
