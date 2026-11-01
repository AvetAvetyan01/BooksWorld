namespace BooksWorld.Application.Commands.UserCommands.Common;

public record UserResponse
(
  string AccessToken,
  string RefreshToken,
  UserDTO UserDTO
);