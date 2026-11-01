using BooksWorld.Domain.Models.BookModels.SubbooksDetailsModels;
using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Models.BookModels;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using BooksWorld.Domain.Common;
using BooksWorld.Domain.Enums;
using System.Text.Json;
using Stripe;
using Bogus;

namespace BooksWorld.API.Controllers;

[ApiController]
[Route("/")]
public class DataUploadController(
  StripeClient stripeClient,
  ApplicationDbContext context,
  IConfiguration configuration
) : ControllerBase
{
  private readonly Faker _faker = new();
  private readonly StripeClient _stripeClient = stripeClient;
  private readonly ApplicationDbContext _context = context;
  private readonly IConfiguration _configuration = configuration;

  private record AuthorPart(Translations FullName);
  private record BookPart(Translations Genre, Translations Title);
  private record FullEntity(AuthorPart Author, BookPart[] Books);

  private readonly Translations BookDescription = JsonSerializer.Deserialize<Translations>(new StreamReader(@"/app/UploadData/BooksDescriptions.json").ReadToEnd())!;
  private readonly Translations AuthorAutobiographical = JsonSerializer.Deserialize<Translations>(new StreamReader(@"/app/UploadData/AuthorsAutobiographicals.json").ReadToEnd())!;
  private readonly List<FullEntity> FullEntities = JsonSerializer.Deserialize<List<FullEntity>>(new StreamReader(@"/app/UploadData/FullEntities.json").ReadToEnd())!;
  private readonly Dictionary<Grade, string[]> ReviewsTexts = JsonSerializer.Deserialize<Dictionary<Grade, string[]>>(new StreamReader(@"/app/UploadData/ReviewsTexts.json").ReadToEnd())!;

  [HttpPost("data")]
  public async Task<IResult> UploadData()
  {
    foreach (var fullEntity in FullEntities)
    {
      // var fullEntity = _faker.PickRandom(FullEntities);

      if (_context.Authors.Any(a => a.FullName_EN == fullEntity.Author.FullName[Language.English]))
        throw new Exception($"Author '{fullEntity.Author.FullName[Language.English]}' already exists in database");
        // continue;

      var authorImagePath = $"/images/authors/{fullEntity.Author.FullName[Language.English].Replace(' ', '_')}.jpg";

      var author = await _context.Authors.AddAsync(new Author
      {
        ImagePath = authorImagePath,
        FullName_AM = fullEntity.Author.FullName[Language.Armenian],
        FullName_EN = fullEntity.Author.FullName[Language.English],
        FullName_RU = fullEntity.Author.FullName[Language.Russian],
        Autobiographical_AM = AuthorAutobiographical[Language.Armenian],
        Autobiographical_EN = AuthorAutobiographical[Language.English],
        Autobiographical_RU = AuthorAutobiographical[Language.Russian],
      });

      foreach (var entityBook in fullEntity.Books)
      {
        var bookSplitdGenresNames = new Dictionary<Language, string[]>
        {
          {Language.English,  entityBook.Genre[Language.English] .Split('/')},
          {Language.Russian,  entityBook.Genre[Language.Russian] .Split('/')},
          {Language.Armenian, entityBook.Genre[Language.Armenian].Split('/')}
        };

        List<int> basesIds = [1]; 

        for (int i = 0; i < bookSplitdGenresNames[Language.English].Length; i++)
        {
          var genre = await _context.Genres.FirstOrDefaultAsync(
            g => g.Name_EN == bookSplitdGenresNames[Language.English][i]);

          if (genre == null)
          {
            var baseGenreId = basesIds.Count > 1 ? basesIds[^1] : 1;

            var baseGenre = await _context.Genres.FirstOrDefaultAsync(g => g.Id == baseGenreId)
              ?? throw new Exception($"Genre by {basesIds[^1]} Id not found");

            var newGenre = await _context.Genres.AddAsync(new Genre
            {
              BaseId = basesIds[^1],
              BasesIds = [.. basesIds],
              Name_AM = bookSplitdGenresNames[Language.Armenian][i],
              Name_EN = bookSplitdGenresNames[Language.English] [i],
              Name_RU = bookSplitdGenresNames[Language.Russian] [i]
            });

            baseGenre.SubgenresCount++;

            await _context.SaveChangesAsync();

            basesIds.Add(newGenre.Entity.Id);
          }
          else 
            basesIds.Add(genre.Id);
        }
        
        var bookGenre = await _context.Genres.FirstOrDefaultAsync(g => g.Id == basesIds.Last())
          ?? throw new Exception($"Last Genre of '{string.Join('/',basesIds)}' not found");

        if (_context.Books.Any(a => a.Title_EN == entityBook.Title[Language.English]))
          throw new Exception($"Book '{entityBook.Title[Language.English]}' already exists in database");

        var bookImagePath = $"/images/books/{Regex.Replace(
            entityBook.Title[Language.English].Replace(' ', '_'),
            $"[{Regex.Escape(new string(['/','\\',':','<','>','|',':','?','*']))}]",
            "-")}.jpg";
        
        var book = new Book
        {
          ImageUrl = $"{_configuration["SupabaseOptions:Url"]}/storage/v1/object/public/BW-public{bookImagePath}",
          ImagePath = bookImagePath,
          Title_AM = entityBook.Title[Language.Armenian],
          Title_EN = entityBook.Title[Language.English],
          Title_RU = entityBook.Title[Language.Russian],
          Description_AM = BookDescription[Language.Armenian],
          Description_EN = BookDescription[Language.English],
          Description_RU = BookDescription[Language.Russian],
          Rating = 0,
          GradesCount = 0,
          Author = author.Entity,
          Genre = bookGenre,
          Subbooks = []
        };

        await _context.Books.AddAsync(book);

        foreach (var i in Enumerable.Range(1, _faker.Random.Byte(2,3)))
        {
          var subbookFormat = _faker.PickRandom<BookFormat>();
          var subbook = new Subbook
          {
            BookId = book.Id,
            Format = subbookFormat,
            Language = _faker.PickRandom<Language>(),
            Year = _faker.Random.Int(1950, 2024),
            Price = _faker.Random.Int(20, 41) * 250,
            Publisher = _faker.Company.CompanyName(),
            FilePath = subbookFormat switch
            {
              BookFormat.Audio => "audiobooks/book.mp3",
              BookFormat.Electronic => "ebooks/book.pdf",
              _ => ""
            },
            IntroductionFilePath = subbookFormat switch
            {
              BookFormat.Audio => "introductions/audiobooks/introduction.mp3",
              BookFormat.Paper => "introductions/paperbooks/introduction.pdf",
              BookFormat.Electronic => "introductions/ebooks/introduction.pdf",
              _ => ""
            },
            Details = subbookFormat switch
            {
              BookFormat.Audio => new AudiobookDetail
              {
                Duration = new TimeOnly(_faker.Random.Int(3,8), _faker.Random.Int(4,55), _faker.Random.Int(1,55)),
                Reader = _faker.Name.FullName()
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

          book.Formats |= subbook.Format;
          book.Languages |= subbook.Language;

          book.Subbooks.Add(subbook);

          var stripeProduct = await _stripeClient.V1.Products.CreateAsync(new ProductCreateOptions
          {
            Active = true,
            Name = book.Title_EN,
            Description = $"{book.Author.FullName_EN} - {subbook.Format}",
          });

          var stripePrice = await _stripeClient.V1.Prices.CreateAsync(new ()
          {
            Product = stripeProduct.Id,
            Currency = "AMD",
            UnitAmount = (long)subbook.Price * 100,
          });

          subbook.StripeProductId = stripeProduct.Id;
          subbook.StripePriceId = stripePrice.Id;
        }

        if (_faker.Random.Bool(0.4f))
        {
          var discountPercent = _faker.PickRandomParam(10, 20, 30);

          var coupon = await _stripeClient.V1.Coupons.CreateAsync(
            new CouponCreateOptions
            {
              Name = $"Coupon: {book.Title_EN}",
              Duration = "forever", // DurationInMonths
              PercentOff = discountPercent,
              AppliesTo = new CouponAppliesToOptions
                { Products = [..book.Subbooks.Select(sb => sb.StripeProductId)] },
            });

          foreach(var subbook in book.Subbooks) 
            subbook.StripeCouponId = coupon.Id;

          book.DiscountPercent = discountPercent;

          if (_faker.Random.Bool(0.6f))
            book.DiscountDeadline = _faker.PickRandomParam(
              new DateTime(2027, 8,  7, 21, 3, 8, DateTimeKind.Utc),
              new DateTime(2027, 4,  5, 15, 7, 1, DateTimeKind.Utc),
              new DateTime(2027, 1, 21, 14, 6, 4, DateTimeKind.Utc)
            );
        }

        await _context.SaveChangesAsync();

        int gradesCount = 0;
        List<int> grades = [];
        foreach(var i in Enumerable.Range(1,_faker.Random.Int(15, 25)))
        {
          var grade = _faker.PickRandom<Grade>();

          await _context.Reviews.AddAsync(new ()
          {
            BookId = book.Id,
            UserName = _faker.Name.FullName(),
            Comment = _faker.PickRandom(ReviewsTexts[grade]),
            Grade = grade,
          });
          
          grades.Add((int)grade);
          gradesCount++;
        }

        book.Rating = Math.Round((double)grades.Sum() / gradesCount, 1);
        book.GradesCount = gradesCount;

        await _context.SaveChangesAsync();

        // WE MUST TO DELETE THIS 'break'
        // break;
        // WE MUST TO DELETE THIS 'break'
      }
    }

    var tables = new Dictionary<string, int>()
    {
      ["Books"] = _context.Books.Count(),
      ["Subbooks"] = _context.Subbooks.Count(),
      ["Genres"] = _context.Genres.Count(),
      ["Reviews"] = _context.Reviews.Count(),
      ["Authors"] = _context.Authors.Count(),
    };

    return Results.Ok(tables);
  }
}