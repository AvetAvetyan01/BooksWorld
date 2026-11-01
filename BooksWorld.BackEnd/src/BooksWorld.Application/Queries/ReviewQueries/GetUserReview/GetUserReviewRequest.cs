namespace BooksWorld.Application.Queries.ReviewQueries.GetUserReview;

public record GetUserReviewRequest
(
  Guid UserId,
  int BookId
);