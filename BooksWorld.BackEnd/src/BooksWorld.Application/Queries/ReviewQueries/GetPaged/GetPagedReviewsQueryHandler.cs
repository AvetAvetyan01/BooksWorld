using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Collections;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.ReviewQueries.GetPaged;

public class GetPagedReviewsQueryHandler
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetPagedReviewsQuery, PagedCollection<Review>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<PagedCollection<Review>> Handle
    (GetPagedReviewsQuery query, CancellationToken token) => await Task.Run(() =>
  {
    var reviews = _dbContext.Reviews.AsNoTracking();

    var pagedReviews = PagedCollection<Review>.Parse(reviews, query.Page, query.Size);

    return pagedReviews;
  });
}