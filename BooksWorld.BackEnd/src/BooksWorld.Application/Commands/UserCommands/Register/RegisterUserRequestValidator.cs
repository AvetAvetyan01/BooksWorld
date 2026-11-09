using FluentValidation;

namespace BooksWorld.Application.Commands.UserCommands.Register;

public class RegisterUserRequestValidator : AbstractValidator<RegisterUserRequest>
{
  public RegisterUserRequestValidator()
  {
    // RuleFor(m => m.Name)
    //     .Length(min: 3, max: 20)
    //     .NotEmpty()
    //     .NotNull();

    // RuleFor(m => m.Phone)
    //     .Length(8)
    //     .NotEmpty()
    //     .NotNull();

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
