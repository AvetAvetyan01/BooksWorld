using BooksWorld.Domain.Models.BookModels.SubbooksDetailsModels;
using BooksWorld.Domain.Models.BookModels;
using BooksWorld.Domain.Enums;
using Bogus;

namespace BooksWorld.Domain.DataGenerators;

public static class Generator
{
  private static readonly Faker _faker = new();

  public static Subbook GenerateSubbook(int bookId, BookFormat format) => new()
  {
    BookId = bookId,
    Format = format,
    Language = _faker.PickRandom<Language>(),
    Year = _faker.Random.Int(1950, 2024),
    Price = _faker.Random.Int(20, 41) * 250,
    Publisher = _faker.Company.CompanyName(),
    FilePath = "",
    IntroductionFilePath = "",
    Details = format switch
    {
      BookFormat.Audio => new AudiobookDetail
      {
        Duration = new TimeOnly(_faker.Random.Int(3,8), _faker.Random.Int(4,55), _faker.Random.Int(1,55)),
        Reader = "John Smith",
      },
      BookFormat.Paper => new PaperbookDetail
      {
        PagesCount = _faker.Random.Int(120, 420),
        Quantity = _faker.Random.Int(80, 400),
        SalesCount = _faker.Random.Int(3, 14),
      },
      BookFormat.Electronic => new EBookDetail
      {
        PagesCount = _faker.Random.Int(120, 420)
      },
      _ => new()
    }
  };
}