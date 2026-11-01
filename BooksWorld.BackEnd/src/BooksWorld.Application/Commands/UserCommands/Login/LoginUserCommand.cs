using BooksWorld.Application.Commands.UserCommands.Common;
using MediatR;

namespace BooksWorld.Application.Commands.UserCommands.Login;

public sealed record LoginUserCommand
(
    string Email,
    string Password
)
: IRequest<UserResponse>;