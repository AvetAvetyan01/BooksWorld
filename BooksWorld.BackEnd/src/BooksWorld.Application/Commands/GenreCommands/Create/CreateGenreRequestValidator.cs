using FluentValidation;

namespace BooksWorld.Application.Commands.GenreCommands.Create;

public class CreateGenreRequestValidator : AbstractValidator<CreateGenreRequest>
{
    public CreateGenreRequestValidator()
    {
        RuleFor(r => r.Name)
            .NotNull()
            .NotEmpty()
            .MaximumLength(100)
            .WithMessage("Invalid name value");

        RuleFor(r => r.BaseId)
            .NotEqual(0)
            .WithMessage("Invalid base ID");
    }
}
