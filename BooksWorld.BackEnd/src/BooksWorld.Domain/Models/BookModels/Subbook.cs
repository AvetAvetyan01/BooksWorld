using BooksWorld.Domain.Interfaces.Generics;
using BooksWorld.Domain.Enums;

namespace BooksWorld.Domain.Models.BookModels;

public class Subbook : IEntity
{
  // 1. create pubisher class
  public int          Id                    { get; set; } 
  public int          BookId                { get; set; }
  public string       StripePriceId         { get; set; } = string.Empty;
  public string       StripeProductId       { get; set; } = string.Empty;
  public string?      StripeCouponId        { get; set; }
  public int          Year                  { get; set; }
  public Language     Language              { get; set; }
  public BookFormat   Format                { get; set; }
  public decimal      Price                 { get; set; }
  public decimal      DiscountedPrice       { get; set; }
  public string       Publisher             { get; set; } = string.Empty;
  public string       FilePath              { get; set; } = string.Empty;
  public string       IntroductionFilePath  { get; set; } = string.Empty;
  public object       Details               { get; set; } = new ();
}