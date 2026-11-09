using BooksWorld.Domain.Interfaces.Generics;

namespace BooksWorld.Domain.Models;

// probably we need to add 'BooksCount' field
public class Author : IEntity
{
  public int              Id                    { get; set; }
  public required string  ImagePath             { get; set; }
  public required string  FullName_AM           { get; set; } = string.Empty;
  public required string  FullName_EN           { get; set; } = string.Empty;
  public required string  FullName_RU           { get; set; } = string.Empty;
  public required string  Autobiographical_AM   { get; set; } = string.Empty;
  public required string  Autobiographical_EN   { get; set; } = string.Empty;
  public required string  Autobiographical_RU   { get; set; } = string.Empty;
  
  // public ICollection<Book> Books { get; set; } = [];
}