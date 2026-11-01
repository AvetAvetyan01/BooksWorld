using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Collections;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.AuthorQueries.GetPaged;

public class GetPagedAuthorsQueryHandler
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetPagedAuthorsQuery, PagedCollection<Author>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<PagedCollection<Author>> Handle
    (GetPagedAuthorsQuery request, CancellationToken cancellationToken) => await Task.Run(() => 
  {
    var authors = _dbContext.Authors.AsNoTracking();
    var pagedAuthors = PagedCollection<Author>.Parse(authors, request.Page, (int)request.Size);

    return pagedAuthors;
  });
}
