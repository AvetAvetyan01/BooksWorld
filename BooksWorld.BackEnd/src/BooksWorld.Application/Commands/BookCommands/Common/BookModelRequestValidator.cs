using FluentValidation;

namespace BooksWorld.Application.Commands.BookCommands.Common;

public class BookModelRequestValidator : AbstractValidator<BookModelRequest>
{
  public BookModelRequestValidator()
  {
    // RuleFor(r => r.Title);

    // RuleFor(r => r.AuthorId)
    //     .NotNull()
    //     .NotEmpty();

    // RuleFor(r => r.GenreId)
    //     .NotNull()
    //     .NotEmpty();

    // RuleFor(r => r.ImageUrl)
    //     .NotNull()
    //     .NotEmpty();

    // RuleFor(r => r.Description);
  }
}
