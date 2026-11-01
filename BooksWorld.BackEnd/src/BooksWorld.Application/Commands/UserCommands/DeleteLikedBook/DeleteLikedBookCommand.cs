using MediatR;

namespace BooksWorld.Application.Commands.UserCommands.DeleteLikedBook;

public record DeleteLikedBookCommand(
  Guid? UserId,
  int BookId
) 
: IRequest<int>;