using BooksWorld.Application.Common.Requests.Pagination;
using BooksWorld.Domain.Collections;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.AuthorQueries.GetPaged;

public sealed class GetPagedAuthorsQuery
  : PaginationRequest, IRequest<PagedCollection<Author>>;