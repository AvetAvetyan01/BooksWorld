namespace BooksWorld.Domain.Interfaces.Generics;

public interface IService<T, TModel> 
{
  Task<T?> GetByIdAsync(int id);
  Task CreateAsync(TModel entity);
  Task UpdateAsync(int id, TModel entity);
  Task DeleteAsync(int id);
}