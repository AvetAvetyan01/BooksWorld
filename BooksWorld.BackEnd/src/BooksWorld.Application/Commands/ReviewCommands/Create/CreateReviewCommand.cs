using MediatR;

namespace BooksWorld.Application.Commands.ReviewCommands.Create;

public sealed record CreateReviewCommand
(
  Guid UserId,
  int BookId,
  int Grade,
  string? Comment
) 
: IRequest<int>;
