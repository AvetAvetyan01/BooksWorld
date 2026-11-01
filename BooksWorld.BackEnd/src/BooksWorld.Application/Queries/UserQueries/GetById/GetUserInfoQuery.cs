using BooksWorld.Application.Commands.UserCommands.Common;
using MediatR;

namespace BooksWorld.Application.Queries.UserQueries.GetById;

public sealed record GetUserInfoQuery(Guid UserId) : IRequest<UserInfo?>;
