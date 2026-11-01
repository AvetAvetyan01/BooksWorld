using MediatR;

namespace BooksWorld.Application.Commands.CartCommands.Delete;

public record DeleteCartBookRequest(Guid UserId) : IRequest;