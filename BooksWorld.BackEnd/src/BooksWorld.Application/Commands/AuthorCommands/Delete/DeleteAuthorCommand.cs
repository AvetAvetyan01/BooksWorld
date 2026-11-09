using MediatR;

namespace BooksWorld.Application.Commands.AuthorCommands.Delete;

public sealed record DeleteAuthorCommand(int Id) : IRequest<int>;
