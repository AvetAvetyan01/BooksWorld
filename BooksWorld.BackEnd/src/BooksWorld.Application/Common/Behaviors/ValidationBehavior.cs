using ErrorOr;
using FluentValidation;
using MediatR;

namespace BooksWorld.Application.Common.Behaviors;

public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest> validator) :
  IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
{
  private readonly IValidator<TRequest> _validator = validator;

  public async Task<TResponse> Handle(
    TRequest request,
    RequestHandlerDelegate<TResponse> next,
    CancellationToken cancellationToken)
  {
    var validationResult = _validator.Validate(request);

    if (validationResult.IsValid)
      await next();

    var errors = validationResult.Errors
      .ConvertAll(
        validationFailure => Error.Validation(
          validationFailure.PropertyName,
          validationFailure.ErrorMessage
      ));

    return (dynamic)errors;
  }
}
