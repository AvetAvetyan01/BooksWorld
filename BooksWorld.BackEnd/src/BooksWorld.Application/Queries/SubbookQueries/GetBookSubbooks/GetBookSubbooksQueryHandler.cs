using BooksWorld.Application.Queries.ExchangeQueries;
using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Models.BookModels;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace BooksWorld.Application.Queries.SubbookQueries.GetBookSubbooks;

public class GetBookSubbooksQueryHandler(ApplicationDbContext dbContext ,IMediator mediator) 
  : IRequestHandler<GetBookSubbooksQuery, IEnumerable<Subbook>>
{
  private readonly IMediator _mediator = mediator;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<IEnumerable<Subbook>> Handle
    (GetBookSubbooksQuery query, CancellationToken cancellationToken) => await Task.Run(async () => 
  {
    var subbooks = await _dbContext.Subbooks
      .AsNoTracking()
      .Where(s => s.BookId == query.BookId)
      .ToListAsync();

    var conversionResult = await _mediator.Send(new GetCurrencyPairConversionQuery(query.Currency));

    foreach(var subbook in subbooks)
    {
      subbook.Price = Math.Round(subbook.Price * (decimal)conversionResult.Conversion_rate, 2);
      
      if (query.DiscountPercent != null)
        subbook.DiscountedPrice = Math.Round(subbook.Price - (decimal)(subbook.Price * query.DiscountPercent / 100), 2);
    }

    return subbooks;
  });
}