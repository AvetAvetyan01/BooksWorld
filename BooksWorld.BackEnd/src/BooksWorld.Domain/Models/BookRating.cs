namespace BooksWorld.Domain.Models;

public class BookRating
{
  public double Average    { get; set; }
  public int    TotalCount { get; set; }
  public Dictionary<byte, short> Grades { get; set; } = new()
  {
    {1,0},
    {2,0},
    {3,0},
    {4,0},
    {5,0}
  };
}