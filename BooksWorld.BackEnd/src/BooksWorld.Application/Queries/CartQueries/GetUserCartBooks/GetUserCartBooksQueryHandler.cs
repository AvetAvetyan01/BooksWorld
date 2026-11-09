using BooksWorld.Application.Queries.ExchangeQueries;
using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.CartQueries.GetUserCartBooks;

public class GetCartBooksQueryHandler
  (ApplicationDbContext dbContext, IMediator mediator) 
  : IRequestHandler<GetUserCartBooksQuery, IEnumerable<CartBook>>
{
  private readonly IMediator _mediator = mediator;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<IEnumerable<CartBook>> Handle
    (GetUserCartBooksQuery query, CancellationToken cancellationToken) => await Task.Run(async () => 
  {
    var cartBooks = await _dbContext.CartBooks
      .AsNoTracking()
      .Include(cb => cb.Subbook)
      .Where(cb => cb.UserId == query.UserId)
      .OrderBy(cb => cb.Id)
      .ToListAsync();
    
    var conversionResult = await _mediator.Send(new GetCurrencyPairConversionQuery(query.Currency)); 

    foreach(var cartBook in cartBooks)
    {
      cartBook.Subbook.Price = Math.Round(cartBook.Subbook.Price * (decimal)conversionResult.Conversion_rate, 2);
      
      if (cartBook.Quantity != null)
        cartBook.Subbook.Price *= (decimal)cartBook.Quantity;

      if (cartBook.DiscountPercent != null)
        cartBook.Subbook.DiscountedPrice = Math.Round(cartBook.Subbook.Price - (decimal)(cartBook.Subbook.Price * cartBook.DiscountPercent / 100), 2);
    }

    return cartBooks;
  });
}