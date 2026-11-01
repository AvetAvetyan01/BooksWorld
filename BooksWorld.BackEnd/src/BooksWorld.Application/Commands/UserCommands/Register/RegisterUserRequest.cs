namespace BooksWorld.Application.Commands.UserCommands.Register;

public sealed record RegisterUserRequest
(
    string Name,
    string Email,
    string Phone,
    string Password
);
