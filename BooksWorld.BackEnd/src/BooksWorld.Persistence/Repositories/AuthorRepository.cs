using BooksWorld.Domain.Models;
using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Domain.FiltrationModels;
using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Persistence.Repositories.Common;
using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Enums;

namespace BooksWorld.Persistence.Repositories;

public class AuthorRepository(ApplicationDbContext context)
  : StandartRepository<Author>(context), IAuthorRepository
{
  private readonly ApplicationDbContext _context = context;

  public async Task<IEnumerable<Author>> GetFilteredAsync(AuthorsFilter filter) =>
    await Task.Run(() => 
    {
      var authors = _context.Authors.AsQueryable();

      if (!string.IsNullOrEmpty(filter.Search))
        authors = filter.SearchField switch
        {
          AuthorsSearchField.Id => authors.Where(b => b.Id.ToString().Contains(filter.Search)),
          
          AuthorsSearchField.FullName => filter.SearchLanguage switch
          {
            Language.Armenian => authors.Where(b => b.FullName_AM.Contains(filter.Search, StringComparison.CurrentCultureIgnoreCase)),
            Language.English  => authors.Where(b => b.FullName_EN.Contains(filter.Search, StringComparison.CurrentCultureIgnoreCase)),
            Language.Russian  => authors.Where(b => b.FullName_RU.Contains(filter.Search, StringComparison.CurrentCultureIgnoreCase)),

            _ => authors
          },

          _ => authors
        };

      return authors;
    });
}