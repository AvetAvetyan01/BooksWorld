using BooksWorld.Domain.Models;
using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using MapsterMapper;
using MediatR;

namespace BooksWorld.Application.Commands.ReviewCommands.Create;

public class CreateReviewCommandHandler
  (IMapper mapper, ApplicationDbContext dbContext) 
  : IRequestHandler<CreateReviewCommand, int>
{
  private readonly IMapper _mapper = mapper;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(CreateReviewCommand command, CancellationToken cancellationToken)
  {
    var book = await _dbContext.Books.FirstOrDefaultAsync(b => b.Id == command.BookId, cancellationToken)
      ?? throw new ArgumentException($"Book not found with this ID '{command.BookId}'");
  
    var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == command.UserId, cancellationToken)
      ?? throw new ArgumentException($"User not found with this ID '{command.UserId}'");

    var review = _mapper.Map<Review>(command);

    // in future we must to give UserName from client 
    review.UserName = user.Name;

    var creatingResult = await _dbContext.Reviews.AddAsync(review, cancellationToken);
  
    var bookReviews = _dbContext.Reviews.Where(r => r.BookId == book.Id);

    book.Rating = Math.Round(bookReviews.Average(r => (int)r.Grade), 1);
    book.GradesCount++;

    await _dbContext.SaveChangesAsync(cancellationToken);

    return creatingResult.Entity.Id;
  }
}