using BooksWorld.Domain.Interfaces.Generics;

namespace BooksWorld.Domain.Models;

public class UserRefreshToken : IEntity
{
  public int        Id          { get; set; }
  public Guid       UserId      { get; set; }
  public bool       IsUsed      { get; set; }
  public bool       IsRevoked   { get; set; }
  public string     Value       { get; set; } = string.Empty;
  public DateTime   UsedAt      { get; set; } 
}