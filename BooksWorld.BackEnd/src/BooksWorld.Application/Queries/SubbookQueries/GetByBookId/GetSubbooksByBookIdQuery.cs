using BooksWorld.Domain.Models.BookModels;
using MediatR;

namespace BooksWorld.Application.Queries.SubbookQueries.GetByBookId;

public record GetSubbooksByBookIdQuery(int BookId) : IRequest<IEnumerable<Subbook>>;