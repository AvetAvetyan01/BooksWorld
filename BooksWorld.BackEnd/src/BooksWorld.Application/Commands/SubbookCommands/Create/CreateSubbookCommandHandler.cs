using BooksWorld.Persistence.DataProviders;
using BooksWorld.Application.Common.Extensions;
using BooksWorld.Application.Common.Constants;
using BooksWorld.Domain.Models.BookModels;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Enums;
using MapsterMapper;
using MediatR;
using Stripe;
using System.Text.RegularExpressions;

namespace BooksWorld.Application.Commands.SubbookCommands.Create;

public class CreateSubbookCommandHandler(
  IMapper mapper,
  Supabase.Client supabaseClient,
  StripeClient stripeClient,
  ApplicationDbContext dbContext
) : IRequestHandler<CreateSubbookCommand, int>
{
  private readonly IMapper _mapper = mapper;
  private readonly Supabase.Client _supabaseClient = supabaseClient;
  private readonly StripeClient _stripeClient = stripeClient;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle
    (CreateSubbookCommand command, CancellationToken cancelationToken)
  {
    // առանց ես ամենի իրական ժամանակում թարմացվումեն տվյալները, ուղակի ֆորմատ ու լեզու 
    // թվարկումները (enums) չեն թարմացվում, այդ իսկ պատճառով պետքա ձեռնակի թարմացվեն, իսկ ավելի լավ
    // կարա լինի որ ես ամենը ավտոմատացնելու համար միհատ սովորենք domain event-ները
    var subbook = _mapper.Map<Subbook>(command);
    
    ArgumentNullException.ThrowIfNull(command.IntroductionFile);

    var book = await _dbContext.Books
      .Include(b => b.Author)
      .FirstOrDefaultAsync(b => b.Id == command.BookId, cancelationToken)
      ?? throw new Exception($"Book Not Found By Given ID (${command.BookId})");

    book.Formats |= subbook.Format;
    book.Languages |= subbook.Language;
    
    var stripeProduct = await _stripeClient.V1.Products.CreateAsync(new ProductCreateOptions
    {
      Active = true,
      Name = book.Title_EN,
      Description = $"{book.Author.FullName_EN} - {subbook.Format}",
    }, 
    null,
    cancelationToken);

    subbook.StripeProductId = stripeProduct.Id;

    var stripePrice = await _stripeClient.V1.Prices.CreateAsync(new PriceCreateOptions
    {
      Product = stripeProduct.Id,
      Currency = "AMD",
      UnitAmount = (long)subbook.Price * 100,
    }, 
    null, 
    cancelationToken);

    subbook.StripePriceId = stripePrice.Id;

    if (book.DiscountPercent != null)
    {
      var stripeCoupon = await _stripeClient.V1.Coupons.CreateAsync(new CouponCreateOptions
      {
        Name = $"Coupon: {book.Title_EN}",
        Duration = "forever", // DurationInMonths
        PercentOff = book.DiscountPercent,
        AppliesTo = new CouponAppliesToOptions { Products = [stripeProduct.Id] }
      }, 
      null, 
      cancelationToken);

      subbook.StripeCouponId = stripeCoupon.Id;
    }

    if ((command.Format == BookFormat.Electronic) 
        && 
        (
          command.File is null || command.IntroductionFile is null
            ||
          !(command.File.ContentType == "application/pdf" || command.File.ContentType == "pdf")
            || 
          !(command.IntroductionFile.ContentType == "application/pdf" || command.IntroductionFile.ContentType == "pdf")
        )) 
        throw new Exception($"The format of the data files to be stored does not match the required type (pdf, application/pdf). (File: {command.File?.ContentType}, Intro File: {command.IntroductionFile?.ContentType})");
    else if ((command.Format == BookFormat.Paper) 
        && 
        !(command.IntroductionFile.ContentType == "application/pdf" || command.IntroductionFile.ContentType == "pdf")) 
        throw new Exception($"The format of the data file to be stored does not match the required type (pdf, application/pdf). (Intro File: {command.IntroductionFile.ContentType})");
    else if (
        command.File is null || command.IntroductionFile is null
        ||
        (command.Format == BookFormat.Audio) 
        && (command.File.ContentType != "audio/mpeg" || command.File.ContentType != "audio/mpeg"))
        throw new Exception($"The format of the data files to be stored does not match the required type (mp3). (File: {command.File?.ContentType}, Intro File: {command.IntroductionFile?.ContentType})");

    var filesName = Regex.Replace(
          book.Title_EN.Replace(' ', '_'),
          $"[{Regex.Escape(new string(['/','\\',':','<','>','|',':','?','*']))}]",
          "-") + "-" + Guid.NewGuid();

    if (command.Format != BookFormat.Paper)
    {
      var fileBytes = await command.File.GetFileBytes(cancelationToken);
      var filePath = command.Format switch
      {
        BookFormat.Audio  => $"audiobooks/{filesName}.mp3",
        BookFormat.Electronic => $"ebooks/{filesName}.pdf",
        _ => string.Empty
      };

      subbook.FilePath = filePath;
  
      await _supabaseClient.Storage
        .From(SupabaseBucketsNames.Private)
        .Upload(
          fileBytes, 
          filePath, 
          new () { Upsert = true },
          cancellationToken: cancelationToken
        );    
    }
    
    var introductionFileBytes = await command.File.GetFileBytes(cancelationToken);
    var introductionFilePath = command.Format switch
    {
      BookFormat.Audio  => $"audiobooks-intros/{filesName}.mp3",
      BookFormat.Paper  => $"paperbooks-intros/{filesName}.pdf",
      BookFormat.Electronic => $"ebooks-intros/{filesName}.pdf",
      _ => string.Empty,
    };

    subbook.IntroductionFilePath = introductionFilePath;

    await _supabaseClient.Storage
      .From(SupabaseBucketsNames.Public)
      .Upload(
        introductionFileBytes, 
        introductionFilePath, 
        new () { Upsert = true },
        cancellationToken: cancelationToken
      );    

    var creatingResult = await _dbContext.Subbooks.AddAsync(subbook, cancelationToken);

    await _dbContext.SaveChangesAsync(cancelationToken);

    return creatingResult.Entity.Id;
  }
}