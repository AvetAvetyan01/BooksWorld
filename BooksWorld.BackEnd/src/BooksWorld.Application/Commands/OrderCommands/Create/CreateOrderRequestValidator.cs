using FluentValidation;

namespace BooksWorld.Application.Commands.OrderCommands.Create;

public class CreateOrderRequestValidator : AbstractValidator<CreateOrderRequest>
{
  public CreateOrderRequestValidator()
  {
    // RuleFor(r => r.UserId)
    //     .NotNull()
    //     .NotEmpty();

    // RuleFor(r => r.ShippingAddress)
    //     .NotNull()
    //     .NotEmpty()
    //     .MaximumLength(250);

    // RuleFor(r => r.Description)
    //     .MaximumLength(500);
  }
}
