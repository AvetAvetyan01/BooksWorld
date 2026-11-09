using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.CartQueries.GetById;

public class GetCartBookByIdQueryHandler
  (ApplicationDbContext dbContext)
: IRequestHandler<GetCartBookByIdQuery, CartBook?>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<CartBook?> Handle(GetCartBookByIdQuery query, CancellationToken cancellationToken)
  {
    var cartBook = await _dbContext.CartBooks
      .AsNoTracking()
      .FirstOrDefaultAsync(cb => cb.Id == query.Id, cancellationToken);

    return cartBook;
  }
}