using MediatR;

namespace BooksWorld.Application.Commands.UserCommands.AddLikedBook;

public record AddLikedBookCommand(
  Guid UserId,
  int  BookId
) 
: IRequest<int>;