using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.BookQueries.GetBookReviews;

public sealed record GetBookPagedReviewsRequest
(
  int BookId,
  int Page
) : IRequest<IEnumerable<Review>>;