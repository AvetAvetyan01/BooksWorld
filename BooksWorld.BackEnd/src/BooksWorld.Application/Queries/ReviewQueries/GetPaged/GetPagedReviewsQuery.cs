using BooksWorld.Application.Common.Requests.Pagination;
using BooksWorld.Domain.Collections;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.ReviewQueries.GetPaged;

public sealed class GetPagedReviewsQuery
  : PaginationRequest, IRequest<PagedCollection<Review>>;