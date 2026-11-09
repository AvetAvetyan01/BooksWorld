using BooksWorld.Application.Common.Extensions;
using BooksWorld.Application.Common.Constants;
using BooksWorld.Persistence.DataProviders;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Mapster;
using Stripe;

namespace BooksWorld.Application.Commands.AuthorCommands.Update;

public class UpdateAuthorCommandHandler(
  Supabase.Client supabaseClient,
  StripeClient stripeClient,
  ApplicationDbContext dbContext
) : IRequestHandler<UpdateAuthorCommand, int>
{
  private readonly Supabase.Client _supabaseClient = supabaseClient;
  private readonly StripeClient _stripeClient = stripeClient;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle
    (UpdateAuthorCommand command, CancellationToken cancelationToken)
  {
    var author = await _dbContext.Authors.FirstOrDefaultAsync(a => a.Id == command.Id, cancelationToken)
      ?? throw new Exception($"Author Not Found By Given ID ({command.Id})");

    // author.Adapt(command);
    command.Adapt(author);

    var authoralBooksIDs = _dbContext.Books
      .Include(b => b.Author)
      .Where(b => b.Author.Id == command.Id)
      .Select(b => b.Id);
    
    var updatableSubbooks = await _dbContext.Subbooks
      .Select((s) => new { s.BookId, s.StripeProductId, s.Format })
      .Where(s => authoralBooksIDs.Contains(s.BookId))
      .ToListAsync(cancelationToken);

    foreach(var subbook in updatableSubbooks)
    {
      await _stripeClient.V1.Products.UpdateAsync(subbook.StripeProductId, new ProductUpdateOptions
      {
        Description = $"{author.FullName_EN} - {subbook.Format}"
      },
      null,
      cancelationToken);
    }
      
    if (command.Image != null)
    {
      // we can check difference between titles of book and command and do 1-remove, updata or 2-upload
      await _supabaseClient.Storage
        .From(SupabaseBucketsNames.Public)
        .Remove(author.ImagePath);

      var imagePath = $"images/authors/{Regex.Replace(
        author.FullName_EN.Replace(' ', '_'),
        $"[{Regex.Escape(new string(['/','\\',':','<','>','|',':','?','*']))}]",
        "-")}-{Guid.NewGuid()}.jpg";

      var imageBytes = await command.Image.GetFileBytes(cancelationToken);

      author.ImagePath = imagePath;
      
      var result = await _supabaseClient.Storage
        .From(SupabaseBucketsNames.Public) 
        .Upload(imageBytes, imagePath,
          // author.ImagePath,
          new () { Upsert = true }, 
          cancellationToken: cancelationToken
        );    
    }

    var updatingResult = _dbContext.Authors.Update(author);

    await _dbContext.SaveChangesAsync(cancelationToken);

    return updatingResult.Entity.Id;
  } 
}
