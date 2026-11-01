using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Interfaces.Generics;

namespace BooksWorld.Domain.Models;

public class Review : IEntity
{
  public int      Id        { get; set; }
  public int      BookId    { get; set; }
  public Guid     UserId    { get; set; }
  public string   UserName  { get; set; } = string.Empty;
  public Grade    Grade     { get; set; }
  public string?  Comment   { get; set; }
}

// if future we need to add (Date: DateOnly, Likes, Dislikes) 