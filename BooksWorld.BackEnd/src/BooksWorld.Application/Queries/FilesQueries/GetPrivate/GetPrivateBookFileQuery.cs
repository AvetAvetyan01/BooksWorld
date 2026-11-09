using MediatR;

namespace BooksWorld.Application.Queries.FilesQueries.GetPrivate;

public record GetPrivateBookFileQuery(int SubbookId, Guid UserId) : IRequest<string?>;