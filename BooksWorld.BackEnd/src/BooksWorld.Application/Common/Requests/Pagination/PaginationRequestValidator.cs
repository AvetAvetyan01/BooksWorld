using FluentValidation;

namespace BooksWorld.Application.Common.Requests.Pagination;

public class PaginationRequestValidator : AbstractValidator<PaginationRequest>
{
  public PaginationRequestValidator()
  {
    RuleFor(r => r.Page)
      .NotNull()
      .NotEmpty()
      .GreaterThan(0);

    // RuleFor(r => r.Size)
    //   .IsInEnum();
  }
}
