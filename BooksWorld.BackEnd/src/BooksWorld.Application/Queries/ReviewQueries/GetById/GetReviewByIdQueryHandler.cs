using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.ReviewQueries.GetById;

public class GetReviewByIdQueryHandler
  (ApplicationDbContext dbContext) : IRequestHandler<GetReviewByIdQuery, Review?>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<Review?> Handle(GetReviewByIdQuery query, CancellationToken cancellationToken)
  {
    var review = await _dbContext.Reviews
      .AsNoTracking()
      .FirstOrDefaultAsync(r => r.Id == query.ReviewId, cancellationToken);

    return review;
  }
}
