using MediatR;

namespace BooksWorld.Application.Commands.CartCommands.Delete;

public record DeleteCartBookCommand(int CartBookId) : IRequest<int>;