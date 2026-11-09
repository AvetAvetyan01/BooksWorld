using BooksWorld.Domain.Models;
using BooksWorld.Domain.Interfaces.Generics;
using BooksWorld.Domain.FiltrationModels;

namespace BooksWorld.Domain.Interfaces.Repositories;

public interface IAuthorRepository : IRepository<Author>
{
  Task<IEnumerable<Author>> GetFilteredAsync(AuthorsFilter filter);
}