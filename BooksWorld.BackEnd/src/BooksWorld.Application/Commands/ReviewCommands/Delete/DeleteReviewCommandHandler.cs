using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace BooksWorld.Application.Commands.ReviewCommands.Delete;

public class DeleteReviewCommandHandler
  (ApplicationDbContext dbContext) 
  : IRequestHandler<DeleteReviewCommand, int>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(DeleteReviewCommand command, CancellationToken cancellationToken)
  {
    var review = await _dbContext.Reviews.FirstOrDefaultAsync(r => r.Id == command.Id, cancellationToken)
      ?? throw new Exception($"Review Not Found By Given ID ({command.Id})");

    if (review.UserId != command.UserId)
      throw new Exception($"Users can not change data of another users (Other User ID: {command.UserId})");

    var book = await _dbContext.Books.FirstOrDefaultAsync(b => b.Id == review.BookId, cancellationToken)
      ?? throw new ArgumentException($"Book not found with this ID '{review.BookId}'");

    var deletingResult = _dbContext.Reviews.Remove(review);

    var bookReviews = _dbContext.Reviews.Where(r => r.BookId == review.BookId);

    book.Rating = Math.Round(bookReviews.Average(r => (int)r.Grade), 1);
    book.GradesCount--;

    await _dbContext.SaveChangesAsync(cancellationToken);
    
    return deletingResult.Entity.Id;
  }
}
