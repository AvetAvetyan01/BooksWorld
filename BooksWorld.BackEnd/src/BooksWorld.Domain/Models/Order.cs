using BooksWorld.Domain.Interfaces.Generics;
using BooksWorld.Domain.Enums;

namespace BooksWorld.Domain.Models;

public class Order : IEntity
{
  public          int          Id                { get; set; }
  public required Guid         UserId            { get; set; }
  public required OrderStatus  Status            { get; set; }
  public required decimal      TotalAmount       { get; set; }
  public required Currency     Currency          { get; set; }
  public required string?      ShippingAddress   { get; set; } = string.Empty; // 400 length
  public required string?      Description       { get; set; } = string.Empty; // 1000 length
  public required DateTime     CreatedAt         { get; set; }
  public required string       StripeCheckoutSessionId { get ; set; }

  public ICollection<OrderItem> OrderItems { get; set; } = [];
}