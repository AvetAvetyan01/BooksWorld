namespace BooksWorld.Domain.Interfaces.Generics;

public interface IRepository<T> where T : class, IEntity
{
  Task<T>     CreateAsync(T entity);
  Task<T?>    GetByIdAsync(int id);
  Task<T>     UpdateAsync(T entity);
  Task<bool>  DeleteAsync(T entity);
  Task<IEnumerable<T>> GetAllAsync();
  Task SaveAsync();
}