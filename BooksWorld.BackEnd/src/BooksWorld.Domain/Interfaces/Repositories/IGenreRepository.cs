using BooksWorld.Domain.FiltrationModels;
using BooksWorld.Domain.Interfaces.Generics;
using BooksWorld.Domain.Models;

namespace BooksWorld.Domain.Interfaces.Repositories
{
  public interface IGenreRepository : IRepository<Genre>
  {
    Task<IEnumerable<Genre>> GetFilteredAsync(GenresFilter filter);
    // Task<ICollection<int>> GetChildrenIdAsync(int baseId);
  }
}
