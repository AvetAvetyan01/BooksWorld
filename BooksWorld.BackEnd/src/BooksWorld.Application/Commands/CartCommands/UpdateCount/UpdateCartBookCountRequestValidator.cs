using BooksWorld.Application.Commands.CartCommands.UpdateCount;
using FluentValidation;

namespace BooksWorld.Application.Commands.UserCommands.UpdateCount;

public class UpdateCartBookCountRequestValidator : AbstractValidator<UpdateCartBookCountRequest>
{
  public UpdateCartBookCountRequestValidator()
  {
  }
}