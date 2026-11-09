
using MediatR;

namespace BooksWorld.Application.Commands.ReviewCommands.Update;

public record UpdateReviewCommand
(
  int Id,
  Guid UserId,
  int BookId,
  int Grade,
  string? Comment
)
: IRequest<int>;