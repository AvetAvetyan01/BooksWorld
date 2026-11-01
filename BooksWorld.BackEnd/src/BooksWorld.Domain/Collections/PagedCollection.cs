using BooksWorld.Domain.Enums;

namespace BooksWorld.Domain.Collections;

public class PagedCollection<T>
{
  private int _size;
  public int Size
  {
    get => _size;
    set => _size = value > ((int)ContentSize.Max) ? ((int)ContentSize.Max) : value;
  }

  public int  Page        { get; private set; }
  public int  PagesCount  { get; private set; }
  public bool HasNext => Page < PagesCount;
  public bool HasPrevious => Page > 1;

  public IEnumerable<T> Collection { get; }

  private PagedCollection
    (IEnumerable<T> collection, int page, int size, int pagesCount)
  {
    Collection = collection;
    Size = size;
    Page = page;
    PagesCount = pagesCount;
  }   

  // we can create additional overload same method but also for IQuarable<T> 
  public static PagedCollection<T> Parse 
    (IEnumerable<T> items, int page, int size)
  {
    var pagesCount = (int)Math.Ceiling((double)items.Count() / size);
    var pagedCollection = items.Skip((page - 1) * size).Take(size); 
    
    return new PagedCollection<T>
      (pagedCollection, page, size, pagesCount);
  }
}