using BooksWorld.Domain.Interfaces.Generics;
using BooksWorld.Domain.Common;
using BooksWorld.Domain.Enums;

namespace BooksWorld.Domain.Models.BookModels;

public class Book : IEntity
{
  public int              Id                { get; set; }
  public string           ImagePath         { get; set; } = string.Empty;
  public string           ImageUrl          { get; set; } = string.Empty;
  public required string  Title_AM          { get; set; } = string.Empty;
  public required string  Title_EN          { get; set; } = string.Empty;
  public required string  Title_RU          { get; set; } = string.Empty;
  public required string  Description_AM    { get; set; } = string.Empty;
  public required string  Description_EN    { get; set; } = string.Empty;
  public required string  Description_RU    { get; set; } = string.Empty;
  public double           Rating            { get; set; }
  public int              GradesCount       { get; set; }
  public int?             DiscountPercent   { get; set; }
  public DateTime?        DiscountDeadline  { get; set; }
  // global unique 13 digit identifier for books
  // public string        ISBN              { get; set; } 
  public Language         Languages         { get; set; }
  public BookFormat       Formats           { get; set; }
  public required Author  Author            { get; set; }
  public required Genre   Genre             { get; set; }

  public required ICollection<Subbook> Subbooks { get; set; } = [];
}