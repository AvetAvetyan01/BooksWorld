using BooksWorld.Domain.Enums;

namespace BooksWorld.Domain.Models;

public class OrderItem
{
  public int          Id              { get; set; }
  public int          OrderId         { get; set; }
  public int          BookId          { get; set; }
  public int          SubbookId       { get; set; }
  public BookFormat   Format          { get; set; }
  public int?         Quantity        { get; set; }
  public decimal      UnitPrice       { get; set; }
  public decimal      Subtotal        { get; set; }
  
  public string?          StripeCouponId  { get; set; } 
  public required string  StripePriceId   { get; set; }
}