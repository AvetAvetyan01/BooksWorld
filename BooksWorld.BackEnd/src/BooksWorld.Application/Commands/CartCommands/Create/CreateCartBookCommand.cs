using BooksWorld.Application.Commands.UserCommands.Common;
using MediatR;

namespace BooksWorld.Application.Commands.CartCommands.Create;

public record CreateCartBookCommand(
  Guid UserId,
  int SubbookId
) : IRequest<CartBookDTO>; 