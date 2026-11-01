using FluentValidation;

namespace BooksWorld.Application.Queries.BookQueries.Get;

public class GetBooksRequestValidator : AbstractValidator<GetBooksRequest>
{
  public GetBooksRequestValidator()
  {
    RuleFor(b => b.Page)
      .GreaterThan(0);

    RuleFor(b => b.SortBy)
      .IsInEnum();

    RuleFor(b => b.AuthorId)
      .GreaterThan(0);

    RuleFor(b => b.GenreId)
      .NotEqual(0);

    RuleFor(b => b.HighRated)
      .NotNull();

    RuleFor(b => b.Discounted)
      .NotNull();

    RuleFor(b => b.Languages)
      .IsInEnum();

    RuleFor(b => b.Formats)
      .IsInEnum();
  }
}
