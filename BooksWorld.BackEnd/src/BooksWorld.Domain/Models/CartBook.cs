using BooksWorld.Domain.Common;
using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Interfaces.Generics;
using BooksWorld.Domain.Models.BookModels;

namespace BooksWorld.Domain.Models;

public class CartBook : IEntity
{
  public int        Id              { get; set; }
  public Guid       UserId          { get; set; } 
  public int        BookId          { get; set; }
  public string     StripePriceId   { get; set; } = string.Empty; 
  public string?    StripeCouponId  { get; set; } 
  public int        SubbookId       { get; set; }
  public int?       Quantity        { get; set; }
  public int?       DiscountPercent { get; set; }   
  public BookFormat BookFormat      { get; set; } // delete in future
  // public Language   Language        { get; set; }  
  
  public required string    BookImgUrl      { get; set; } 
  public required string    BookTitle_AM    { get; set; } 
  public required string    BookTitle_EN    { get; set; } 
  public required string    BookTitle_RU    { get; set; } 
  public required Subbook   Subbook         { get; set; }
}
// we don't need to save not neccessary data in client side,
// thats will be userId and probably bookId 