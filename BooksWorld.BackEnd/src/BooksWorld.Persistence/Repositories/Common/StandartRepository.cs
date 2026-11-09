using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Interfaces.Generics;
using Microsoft.EntityFrameworkCore;

namespace BooksWorld.Persistence.Repositories.Common;

public class StandartRepository<T>
  (ApplicationDbContext context)
  : IRepository<T>
  where T : class, IEntity
{
  private readonly ApplicationDbContext _context = context;

  public virtual async Task<T> CreateAsync(T entity)
  {
    var result = await _context.Set<T>().AddAsync(entity);

    await _context.SaveChangesAsync();

    return result.Entity;
  }

  public virtual async Task<T?> GetByIdAsync(int id) =>
    await _context.Set<T>()
      // .AsNoTracking()
      .FirstOrDefaultAsync(x => x.Id == id);

  // public virtual async Task<T> UpdateAsync(T changedEntity)
  // {
  //   var entity = await _context.Set<T>()
  //     .FirstOrDefaultAsync(a => a.Id == changedEntity.Id);

  //   entity = _context.Set<T>().Update(changedEntity).Entity;

  //   // if (entity != null)
  //   //   _context.Set<T>()
  //   //     .Entry(entity).CurrentValues  
  //   //     .SetValues(changedEntity);

  //   await _context.SaveChangesAsync();

  //   return entity;
  // }

  public virtual async Task<T> UpdateAsync(T entity)
  {
    var changedEntity = _context.Set<T>().Update(entity).Entity;

    await _context.SaveChangesAsync();

    return changedEntity;
  }

  public virtual async Task<bool> DeleteAsync(T entity)
  {
    // await Task.Run(() => _context.Set<T>().Remove(entity));
    await Task.Run(() => _context.Set<T>().FirstOrDefault(e => e.Id == entity.Id));
    
    await _context.SaveChangesAsync();

    return true;
  }

  public virtual async Task<IEnumerable<T>> GetAllAsync() =>
    await Task.Run(() =>
      _context.Set<T>().AsNoTracking());
  
  public async Task SaveAsync() => await _context.SaveChangesAsync();
}