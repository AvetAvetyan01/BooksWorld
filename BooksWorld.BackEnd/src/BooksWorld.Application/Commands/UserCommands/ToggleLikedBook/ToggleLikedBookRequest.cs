using BooksWorld.Application.Commands.UserCommands.AddLikedBook;
using BooksWorld.Domain.Interfaces.Repositories;
using MediatR;

namespace BooksWorld.Application.Commands.UserCommands.ToggleLikedBook;

public class ToggleLikedBookCommandHandler
  (IUserRepository userRepository) : IRequestHandler<ToggleLikedBookCommand, bool>
{
  private readonly IUserRepository _userRepository = userRepository;

  public async Task<bool> Handle(ToggleLikedBookCommand command, CancellationToken cancellationToken)
  {
    await _userRepository.AddLikedBookAsync(command.UserId, command.BookId);

    return true;
  }
}