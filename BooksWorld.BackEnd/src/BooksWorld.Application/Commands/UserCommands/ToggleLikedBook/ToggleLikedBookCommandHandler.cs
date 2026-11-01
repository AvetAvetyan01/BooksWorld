using MediatR;

namespace BooksWorld.Application.Commands.UserCommands.AddLikedBook;

public record ToggleLikedBookRequest(Guid UserId, int BookId) : IRequest;