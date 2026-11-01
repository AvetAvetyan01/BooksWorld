using MediatR;

namespace BooksWorld.Application.Commands.SubbookCommands.Delete;

public record DeleteSubbookCommand(int Id) : IRequest<int>;