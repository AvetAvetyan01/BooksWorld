using BooksWorld.Domain.Models.BookModels.SubbooksDetailsModels;
using BooksWorld.Persistence.DataProviders;
using MediatR;

namespace BooksWorld.Application.Queries.UserQueries.GetBoughtSubbooks;

public class GetUserBoughtSubbooksQueryHandler 
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetUserBoughtSubbooksQuery, IEnumerable<BoughtSubbook>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<IEnumerable<BoughtSubbook>> Handle
    (GetUserBoughtSubbooksQuery query, CancellationToken cancellationToken) => 
    await Task.Run(() => 
    {
      var userBoughtBooks = _dbContext.BuyedSubbooks.Where(bs => bs.UserId == query.UserId);

      return userBoughtBooks;
    });
}