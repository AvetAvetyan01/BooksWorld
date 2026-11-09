using BooksWorld.Persistence.DataProviders;
using BooksWorld.Application.Common.Extensions;
using BooksWorld.Application.Common.Constants;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Enums;
using MediatR;
using Mapster;
using Stripe;

namespace BooksWorld.Application.Commands.SubbookCommands.Update;

public class UpdateSubbookCommandHandler(
  Supabase.Client supabaseClient,
  StripeClient stripeClient,
  ApplicationDbContext dbContext
) : IRequestHandler<UpdateSubbookCommand, int>
{
  private readonly Supabase.Client _supabaseClient = supabaseClient;
  private readonly StripeClient _stripeClient = stripeClient;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle
    (UpdateSubbookCommand command, CancellationToken cancellationToken)
  { 
    // - մեկ այլ տարբերակ՝ ընդհանրապես փոփոխվող պարամետրերում չենք ներառում ֆորմատը ու լեզուն
    // եթե պետքա ուրիշ ֆորմատ կամ ուրիշ լեզու, թող նորը ստեղծվի։

    var book = await _dbContext.Books
      .Include(b => b.Subbooks)
      .FirstOrDefaultAsync(b => b.Id == command.BookId, cancellationToken)
      ?? throw new Exception($"Book Not Found By Given ID ({command.BookId})");

    var subbook = book.Subbooks.FirstOrDefault(s => s.Id == command.Id)
      ?? throw new Exception($"Subbook Not Found By Given ID ({command.Id})");

    if (subbook.Format != command.Format)
    {
      await _stripeClient.V1.Products.UpdateAsync(subbook.StripeProductId, new ProductUpdateOptions
      {
        Active = true,
        Name = book.Title_EN,
        Description = $"{book.Author.FullName_EN} - {command.Format}"
      }, 
      null,
      cancellationToken);
    }

    if (subbook.Price != command.Price)
    {
      var updatedStripePrice = await _stripeClient.V1.Prices.CreateAsync(new PriceCreateOptions
      {
        Product = subbook.StripeProductId,
        Currency = "AMD",
        UnitAmount = (long) command.Price * 100  
      }, 
      null, 
      cancellationToken);

      subbook.StripePriceId = updatedStripePrice.Id;

      var previouStripePrice = await _stripeClient.V1.Prices.UpdateAsync(subbook.StripePriceId, new PriceUpdateOptions
      { Active = false }, 
      null, 
      cancellationToken);
    }

    command.Adapt(subbook);

    var updatingResult = _dbContext.Subbooks.Update(subbook);

    book.Formats = book.Subbooks.Aggregate((BookFormat) 0,(fmt, sb) => fmt |= sb.Format);
    book.Languages = book.Subbooks.Aggregate((Language) 0,(lng, sb) => lng |= sb.Language);
    
    // probably we change the place of this checking (probably inside of beyond file checking block)
    if (command.File != null)
      if (command.Format == BookFormat.Electronic && !(command.File.ContentType == "application/pdf" || command.File.ContentType == "pdf")) 
        throw new Exception($"The format of the data files to be stored does not match the required type (pdf, application/pdf). (File: {command.File.ContentType})");
      else if (command.Format == BookFormat.Audio &&   command.File.ContentType != "mp3")
        throw new Exception($"The format of the data files to be stored does not match the required type (mp3). (File: {command.File.ContentType})");

    if (command.IntroductionFile != null)
      if (command.Format == BookFormat.Electronic && !(command.IntroductionFile.ContentType == "application/pdf" || command.IntroductionFile.ContentType == "pdf")) 
        throw new Exception($"The format of the data files to be stored does not match the required type (pdf, application/pdf). (Intro File: {command.IntroductionFile.ContentType})");
      else if (command.Format == BookFormat.Paper && !(command.IntroductionFile.ContentType == "application/pdf" || command.IntroductionFile.ContentType == "pdf")) 
        throw new Exception($"The format of the data files to be stored does not match the required type (pdf, application/pdf). (Intro File: {command.IntroductionFile.ContentType})");
      else if (command.Format == BookFormat.Audio &&   command.IntroductionFile.ContentType != "mp3")
        throw new Exception($"The format of the data files to be stored does not match the required type (mp3). (Intro File: {command.IntroductionFile.ContentType})");

    if (command.File != null)
    {
      var fileBytes = await command.File.GetFileBytes(cancellationToken);

      await _supabaseClient.Storage
        .From(SupabaseBucketsNames.Private)   
        .Update(
          fileBytes, 
          subbook.FilePath, 
          new () { Upsert = true }
        );    
    }

    if (command.IntroductionFile != null)
    {
      var introductionFileBytes = await command.IntroductionFile.GetFileBytes(cancellationToken);

      await _supabaseClient.Storage
        .From(SupabaseBucketsNames.Public)
        .Update(
          introductionFileBytes, 
          subbook.IntroductionFilePath,
          new () { Upsert = true }
        );    
    }

    await _dbContext.SaveChangesAsync(cancellationToken);
  
    return updatingResult.Entity.Id;
  }
}