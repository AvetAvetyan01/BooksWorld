using BooksWorld.Domain.Collections;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.BookQueries.GetBookReviews;

public sealed record GetBookPagedReviewsQuery
(
  int BookId,
  int Page,
  int Size
)
: IRequest<PagedCollection<Review>>;