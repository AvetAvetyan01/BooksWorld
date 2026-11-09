using FluentValidation;

namespace BooksWorld.Application.Commands.ReviewCommands.Common;

public class ReviewModelRequestValidator : AbstractValidator<ReviewModelRequest>
{
  public ReviewModelRequestValidator()
  {

  }
}
