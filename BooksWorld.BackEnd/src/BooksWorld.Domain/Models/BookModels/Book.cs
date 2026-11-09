using BooksWorld.Domain.Interfaces.Generics;
using BooksWorld.Domain.Common;
using BooksWorld.Domain.Enums;

namespace BooksWorld.Domain.Models.BookModels;

public class Book : IEntity
{
  // 1. we can create SalesCount dictionary property,
  //    where we save in key format and in value the quantity of sales in this format
  // 2. probably we need to change Genre Format to ICollection<Genre>
  //    and change 'Genre' type name to 'Tag'
  // 3. add AuthorId and GenreId (or Genres Ids array)
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
  // public Language         Languages         { get; set; }
  public Language         Languages         { get; set; }
  public BookFormat       Formats           { get; set; }
  public required Author  Author            { get; set; }
  public required Genre   Genre             { get; set; }

  public required ICollection<Subbook> Subbooks { get; set; } = [];
}