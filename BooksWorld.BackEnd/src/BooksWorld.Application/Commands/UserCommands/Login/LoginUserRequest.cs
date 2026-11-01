namespace BooksWorld.Application.Commands.UserCommands.Login;

public sealed record LoginUserRequest
(
    string Email,
    string Password
);