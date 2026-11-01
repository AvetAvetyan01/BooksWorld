using MediatR;

namespace BooksWorld.Application.Commands.UserCommands.AddLikedBook;

public record ToggleLikedBookCommand(Guid UserId, int BookId) : IRequest<bool>;