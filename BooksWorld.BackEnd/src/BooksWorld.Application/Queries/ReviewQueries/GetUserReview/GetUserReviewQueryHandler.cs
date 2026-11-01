using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.ReviewQueries.GetUserReview;

public class GetUserReviewQueryHandler
  (ApplicationDbContext dbContext) 
  : IRequestHandler<GetUserReviewQuery, Review?>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<Review?> Handle(GetUserReviewQuery query, CancellationToken cancellationToken)
  {
    var review = await _dbContext.Reviews
      .AsNoTracking()
      .FirstOrDefaultAsync(r => r.UserId == query.UserId && r.BookId == query.BookId, cancellationToken);

    return review;
  }
}