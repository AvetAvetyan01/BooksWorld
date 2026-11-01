using BooksWorld.Domain.Enums;

namespace BooksWorld.Domain.Models.BookModels;

public struct Price(int priceAMD, Currency currency = Currency.AMD)
{
  public Currency Currency { get; set; } = currency;

  private double _value = priceAMD;
  public double Value
  {
    readonly get => _value * Procents[Currency];
    set => _value = value;
  }

  private static readonly Dictionary<Currency, double> Procents = new()
  {
    [Currency.AMD] = 1,
    [Currency.USD] = 0.0025,
    [Currency.RUB] = 0.25,
  };
}