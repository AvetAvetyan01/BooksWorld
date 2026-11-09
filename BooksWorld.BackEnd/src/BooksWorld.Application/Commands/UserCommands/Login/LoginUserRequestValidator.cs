using FluentValidation;

namespace BooksWorld.Application.Commands.UserCommands.Login;

public class LoginUserRequestValidator : AbstractValidator<LoginUserRequest>
{
    public LoginUserRequestValidator()
    {
        // RuleFor(m => m.Email)
        //     .EmailAddress()
        //     .NotEmpty()
        //     .NotNull();

        // RuleFor(m => m.Password)
        //     .Length(min: 8, max: 20)
        //     .NotEmpty()
        //     .NotNull();
    }
}
