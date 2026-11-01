namespace BooksWorld.Application.Commands.ReviewCommands.Create;

public sealed record CreateReviewRequest
( 
  Guid UserId,
  int BookId,
  int Grade,
  string? Comment
);
