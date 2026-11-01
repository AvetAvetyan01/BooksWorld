using FluentValidation;

namespace BooksWorld.Application.Commands.AuthorCommands.Common;

public class  AuthorModelRequestValidator : AbstractValidator<AuthorModelRequest>
{
  public AuthorModelRequestValidator()
  {
  }
}
