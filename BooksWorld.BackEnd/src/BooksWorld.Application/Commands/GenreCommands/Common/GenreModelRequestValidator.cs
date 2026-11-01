using FluentValidation;

namespace BooksWorld.Application.Commands.GenreCommands.Common;

public class CreateGenreRequestValidator : AbstractValidator<GenreModelRequest>
{
  public CreateGenreRequestValidator()
  {
    // RuleFor(r => r.Name)
    //   .NotNull()
    //   .NotEmpty()
    //   .MaximumLength(100)
    //   .WithMessage("Invalid name value");

    RuleFor(r => r.BaseId)
      .NotNull()
      .NotEqual(0)
      .NotEmpty()
      .WithMessage("Invalid base ID");
  }
}
