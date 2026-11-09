using BooksWorld.Persistence.DataProviders;
using BooksWorld.Application.Common.Extensions;
using BooksWorld.Application.Common.Constants;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Enums;
using Mapster;
using MediatR;
using Stripe;
using System.Text.RegularExpressions;

namespace BooksWorld.Application.Commands.BookCommands.Update;

public class UpdateBookCommandHandler(
  IConfiguration configuration,
  Supabase.Client supabaseClient,
  StripeClient stripeClient, 
  ApplicationDbContext dbContext 
) : IRequestHandler<UpdateBookCommand, int>
{
  private readonly IConfiguration _configuration = configuration;
  private readonly Supabase.Client _supabaseClient = supabaseClient;
  private readonly StripeClient _stripeClient = stripeClient;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle
    (UpdateBookCommand command, CancellationToken cancellationToken)
  {
    var book = await _dbContext.Books
        .Include(b => b.Author)
        .Include(b => b.Subbooks)
        .FirstOrDefaultAsync(b => b.Id == command.Id, cancellationToken)
      ?? throw new Exception($"Book Not Found By Given ID ({command.Id})");

    var isAuthorChanged = book.Author.Id != command.AuthorId;
    var isDiscountPercentChanged = book.DiscountPercent != command.DiscountPercent;

    book.Genre = await _dbContext.Genres.FirstOrDefaultAsync(g => g.Id == command.GenreId, cancellationToken)
      ?? throw new Exception($"Genre Not Found By Given ID ({command.GenreId})");
    
    book.Author = await _dbContext.Authors.FirstOrDefaultAsync(g => g.Id == command.AuthorId, cancellationToken)
      ?? throw new Exception($"Author Not Found By Given ID ({command.AuthorId})");

    command.Adapt(book);

    if (command.Title_EN != book.Title_EN || isAuthorChanged)
    {
      foreach (var subbook in book.Subbooks)
      {
        await _stripeClient.V1.Products.UpdateAsync(subbook.StripeProductId, new ProductUpdateOptions
        {
          Name = book.Title_EN,
          Description = $"{book.Author.FullName_EN} - {subbook.Format}"
        }, 
        null,
        cancellationToken);        
      }
    }

    if (isDiscountPercentChanged)
    {
      foreach (var subbook in book.Subbooks)
      {
        if (string.IsNullOrEmpty(subbook.StripeCouponId))
        {
          await _stripeClient.V1.Coupons.DeleteAsync(subbook.StripeCouponId, null, null, cancellationToken);
          subbook.StripeCouponId = string.Empty;
        }

        if (book.DiscountPercent != null)
        {
          var stripeCoupon = await _stripeClient.V1.Coupons.CreateAsync(new CouponCreateOptions
          {
            PercentOff = book.DiscountPercent,
            Duration = "forever",
            AppliesTo = new CouponAppliesToOptions{ Products = [subbook.StripeProductId] }
          },
          null,
          cancellationToken);

          subbook.StripeCouponId = stripeCoupon.Id;
        }
      }
    }

    if (command.Image != null)
    {
      // we can check difference between titles of book and command and do 1-remove, updata or 2-upload
      await _supabaseClient.Storage
        .From(SupabaseBucketsNames.Public)
        .Remove(book.ImagePath);
      
      var imagePath = $"images/books/{Regex.Replace(
        book.Title_EN.Replace(' ', '_'),
        $"[{Regex.Escape(new string(['/','\\',':','<','>','|',':','?','*']))}]",
        "-")}-{Guid.NewGuid()}.jpg";

      var imageBytes = await command.Image.GetFileBytes(cancellationToken);

      book.ImagePath = imagePath;
      book.ImageUrl = $"{_configuration["SupabaseOptions:Url"]}/storage/v1/object/public/{SupabaseBucketsNames.Public}/{imagePath}";

      await _supabaseClient.Storage
        .From(SupabaseBucketsNames.Public)
        .Upload(imageBytes, imagePath,
          // book.ImagePath, 
          new () { Upsert = true }, 
          cancellationToken: cancellationToken
        );
    }

    var updatingResult = _dbContext.Books.Update(book);

    await _dbContext.SaveChangesAsync(cancellationToken);

    return updatingResult.Entity.Id;
  }
}