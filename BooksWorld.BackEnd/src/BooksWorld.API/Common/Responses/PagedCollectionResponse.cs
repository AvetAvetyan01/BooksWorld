using BooksWorld.Application.Queries.BookQueries.Get;
using BooksWorld.Domain.Collections;

namespace BooksWorld.API.Common.Responses;

public sealed record PagedCollectionResponse<T>
(
    GetBooksRequest Request,
    PagedCollection<T> Response
);
