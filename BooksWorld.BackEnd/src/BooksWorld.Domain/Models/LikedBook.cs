namespace BooksWorld.Domain.Models;

public class LikedBook
{
  public int      Id          { get; set; }
  public Guid     UserId      { get; set; }
  public int      BookId      { get; set; }
}