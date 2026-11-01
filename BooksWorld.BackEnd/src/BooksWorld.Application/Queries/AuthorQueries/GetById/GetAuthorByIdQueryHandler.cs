using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Domain.Models;
using BooksWorld.Persistence.DataProviders;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BooksWorld.Application.Queries.AuthorQueries.GetById;

public class GetAuthorByIdQueryHandler
  (ApplicationDbContext dbContext) 
  : IRequestHandler<GetAuthorByIdQuery, Author?>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<Author?> Handle(GetAuthorByIdQuery query, CancellationToken cancellationToken)
  {
    var author = await _dbContext.Authors
      .AsNoTracking()
      .FirstOrDefaultAsync(a => a.Id == query.Id, cancellationToken);

    return author;
  }
}
