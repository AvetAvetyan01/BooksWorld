using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Domain.Collections;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using BooksWorld.Domain.Enums;
using MediatR;

namespace BooksWorld.Application.Queries.AuthorQueries.Get;

public class GetAuthorsQueryHandler
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetAuthorsQuery, PagedCollection<Author>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<PagedCollection<Author>> Handle
    (GetAuthorsQuery query, CancellationToken cancellationToken) => await Task.Run(() =>
  {
    var authors = _dbContext.Authors.AsNoTracking();

    // we need to validate search string
    if (!string.IsNullOrEmpty(query.Filter.Search))
      authors = query.Filter.SearchField switch
      {
        AuthorsSearchField.Id => authors.Where(b => b.Id.ToString().Contains(query.Filter.Search)),

        AuthorsSearchField.FullName => query.Filter.SearchLanguage switch
        {
          Language.Armenian => authors.Where(b => EF.Functions.ILike(b.FullName_AM, $"%{query.Filter.Search}%")),
          Language.English  => authors.Where(b => EF.Functions.ILike(b.FullName_EN, $"%{query.Filter.Search}%")),
          Language.Russian  => authors.Where(b => EF.Functions.ILike(b.FullName_RU, $"%{query.Filter.Search}%")),
          
          _ => authors
        }, 

        _ => authors
      };

    var pagedAuthors = PagedCollection<Author>.Parse(authors, query.Page, query.Size);

    return pagedAuthors;
  });
}