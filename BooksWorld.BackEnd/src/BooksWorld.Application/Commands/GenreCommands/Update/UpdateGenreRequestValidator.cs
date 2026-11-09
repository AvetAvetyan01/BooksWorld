using FluentValidation;

namespace BooksWorld.Application.Commands.GenreCommands.Update;

public class UpdateGenreRequestValidator : AbstractValidator<UpdateGenreCommand>
{
  public UpdateGenreRequestValidator()
  {
    // RuleFor(r => r.Name);

    RuleFor(r => r.BaseId)
      .NotEqual(0);
  }
}
