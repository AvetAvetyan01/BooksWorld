using BooksWorld.Domain.Models.BookModels;
using MediatR;

namespace BooksWorld.Application.Queries.BookQueries.GetByIds;

public record GetBooksByIdsQuery(int[] BookIds) : IRequest<IEnumerable<Book>>;