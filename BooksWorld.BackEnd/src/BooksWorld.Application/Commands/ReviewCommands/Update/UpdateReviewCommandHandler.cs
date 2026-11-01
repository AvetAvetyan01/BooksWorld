using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using MapsterMapper;
using MediatR;

namespace BooksWorld.Application.Commands.ReviewCommands.Update;

public record UpdateReviewCommandHandler
  (IMapper mapper, ApplicationDbContext dbContext)
  : IRequestHandler<UpdateReviewCommand, int>
{
  private readonly IMapper _mapper = mapper;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(UpdateReviewCommand command, CancellationToken cancellationToken)
  { 
    var book = await _dbContext.Books.FirstOrDefaultAsync(b => b.Id == command.BookId, cancellationToken)
      ?? throw new ArgumentException($"Book not found with this ID '{command.BookId}'");

    var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == command.UserId, cancellationToken)
      ?? throw new Exception($"User Not Found By Given ID ({command.UserId})");

    var review = _mapper.Map<Review>(command);

    // in future we must to give UserName from client 
    review.UserName = user.Name;

    var updatingResult = _dbContext.Reviews.Update(review);

    var bookReviews = _dbContext.Reviews.Where(r => r.BookId == review.BookId);

    book.Rating = Math.Round(bookReviews.Average(r => (int)r.Grade), 1);

    await _dbContext.SaveChangesAsync(cancellationToken);

    return updatingResult.Entity.Id;
  }
}