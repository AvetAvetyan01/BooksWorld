using FluentValidation;

namespace BooksWorld.Application.Queries.BookQueries.GetBookReviews;

public class GetBookPagedReviewsRequestValidator : AbstractValidator<GetBookPagedReviewsRequest>
{
  public GetBookPagedReviewsRequestValidator()
  {
    RuleFor(r => r.BookId)
      .NotEmpty()
      .NotNull();

    RuleFor(r => r.BookId)
      .NotEmpty()
      .NotNull();
  }
}