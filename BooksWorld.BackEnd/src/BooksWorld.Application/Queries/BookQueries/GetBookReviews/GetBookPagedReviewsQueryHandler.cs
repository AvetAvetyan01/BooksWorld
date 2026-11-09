using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Collections;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.BookQueries.GetBookReviews;

public class GetBookPagedReviewsQueryHandler
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetBookPagedReviewsQuery, PagedCollection<Review>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<PagedCollection<Review>> Handle
    (GetBookPagedReviewsQuery query, CancellationToken cancellationToken) => await Task.Run(() => 
  {
    var bookReviews = _dbContext.Reviews
      .Where(r => r.BookId == query.BookId);

    var pagedReviews = PagedCollection<Review>.Parse(bookReviews, query.Page, query.Size);

    return pagedReviews;
  });
}