
namespace BooksWorld.Application.Commands.ReviewCommands.Update;

public record UpdateReviewRequest
(
    Guid UserId,
    int BookId,
    int Grade,
    string? Comment,
    DateTime Date
);