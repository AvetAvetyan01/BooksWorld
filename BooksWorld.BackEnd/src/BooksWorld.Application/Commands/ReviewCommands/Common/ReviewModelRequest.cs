namespace BooksWorld.Application.Commands.ReviewCommands.Common;

public sealed record ReviewModelRequest
(
  Guid UserId,
  int BookId,
  int Grade,
  string? Comment
);