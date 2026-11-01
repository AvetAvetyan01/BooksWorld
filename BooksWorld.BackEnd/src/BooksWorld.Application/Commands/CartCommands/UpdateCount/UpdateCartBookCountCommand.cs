using MediatR;

namespace BooksWorld.Application.Commands.CartCommands.UpdateCount;

public record UpdateCartBookCountCommand
(
  int CartBookId,
  bool Increase
) 
: IRequest<int>;