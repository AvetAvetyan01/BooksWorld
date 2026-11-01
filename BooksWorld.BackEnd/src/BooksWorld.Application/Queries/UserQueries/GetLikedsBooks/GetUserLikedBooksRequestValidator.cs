using FluentValidation;

namespace BooksWorld.Application.Queries.UserQueries.GetLikedsBooks;

public class GetUserLikedBooksRequestValidator : AbstractValidator<GetUserLikedBooksRequest>
{
  public GetUserLikedBooksRequestValidator()
  {
  }
}