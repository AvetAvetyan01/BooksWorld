using FluentValidation;

namespace BooksWorld.Application.Commands.OrderCommands.Common;

public class OrderModelRequestValidator : AbstractValidator<OrderModelRequest>
{
  public OrderModelRequestValidator()
  {
    // RuleFor(r => r.ShippingAddress)
    //   .NotNull()
    //   .NotEmpty()
    //   .MaximumLength(250);

    // RuleFor(r => r.Description)
    //   .MaximumLength(500);
  }
}
