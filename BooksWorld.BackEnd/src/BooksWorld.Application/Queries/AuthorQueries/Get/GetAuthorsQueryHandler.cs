using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Domain.Collections;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.DTO.Cards;
using BooksWorld.Domain.Enums;
using MediatR;

namespace BooksWorld.Application.Queries.AuthorQueries.Get;

public class GetAuthorsQueryHandler
  (ApplicationDbContext dbContext)
  : IRequestHandler<GetAuthorsQuery, PagedCollection<AuthorCard>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<PagedCollection<AuthorCard>> Handle
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

    var authorCards = query.Filter.SearchLanguage switch
    {
      Language.Armenian => authors.Select(a => new AuthorCard(a.Id, a.ImagePath, a.FullName_AM)),
      Language.English  => authors.Select(a => new AuthorCard(a.Id, a.ImagePath, a.FullName_EN)),
      Language.Russian  => authors.Select(a => new AuthorCard(a.Id, a.ImagePath, a.FullName_RU)),

      _ => authors.Select(a => new AuthorCard(a.Id, a.ImagePath, a.FullName_EN)),
    };

    var pagedAuthorsCards = PagedCollection<AuthorCard>.Parse(authorCards, query.Page, query.Size);

    return pagedAuthorsCards;
  });
}