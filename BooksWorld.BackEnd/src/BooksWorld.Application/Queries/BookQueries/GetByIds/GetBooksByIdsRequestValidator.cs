using FluentValidation;

namespace BooksWorld.Application.Queries.BookQueries.GetByIds;

public class GetBooksByIdsRequestValidator : AbstractValidator<GetBooksByIdsRequestValidator>
{
  public GetBooksByIdsRequestValidator()
  {
  }
}