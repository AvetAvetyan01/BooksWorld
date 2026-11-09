using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.ReviewQueries.GetUserReview;

public record GetUserReviewQuery
(
  int BookId,
  Guid UserId
) : IRequest<Review?>;