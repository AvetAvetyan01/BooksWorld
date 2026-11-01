using BooksWorld.Application.Commands.UserCommands.Common;
using MediatR;

namespace BooksWorld.Application.Commands.UserCommands.Register;

public sealed record RegisterUserCommand
(
    string Name,
    string Email,
    string Phone,
    string Password
) : IRequest<UserResponse>;
