using BooksWorld.Domain.Interfaces.Generics;

namespace BooksWorld.Domain.Models;

public class Genre : IEntity
{
  public int    Id              { get; set; } 
  public int    BaseId          { get; set; } 
  public int[]  BasesIds        { get; set; } = []; 
  public int    SubgenresCount  { get; set; }
  public required string Name_AM { get; set; } = string.Empty;
  public required string Name_EN { get; set; } = string.Empty;
  public required string Name_RU { get; set; } = string.Empty;
}