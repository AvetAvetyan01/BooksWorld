using BooksWorld.Persistence.DataProviders;
using BooksWorld.Application.Common.Constants;
using Microsoft.EntityFrameworkCore;
using Supabase;
using MediatR;
using Stripe;
using BooksWorld.Domain.Enums;

namespace BooksWorld.Application.Commands.SubbookCommands.Delete;

public class DeleteSubbookCommandHandler(
  Supabase.Client supabaseClient,
  StripeClient stripeClient,
  ApplicationDbContext dbContext 
) : IRequestHandler<DeleteSubbookCommand, int>
{
  private readonly Supabase.Client _supabaseClient = supabaseClient;
  private readonly StripeClient _stripeClient = stripeClient;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(DeleteSubbookCommand command, CancellationToken cancellationToken)
  {
    var subbook = await _dbContext.Subbooks.FirstOrDefaultAsync(s => s.Id == command.Id, cancellationToken)
      ?? throw new Exception($"Subbook Not Found By Given ID ({command.Id})");

    var book = await _dbContext.Books
      .Include(b => b.Subbooks)
      .FirstOrDefaultAsync(b => b.Id == subbook.BookId, cancellationToken)
      ?? throw new Exception($"Book Not Found By Given ID ({subbook.BookId})");

    if (subbook.StripeCouponId != null)
      await _stripeClient.V1.Coupons.DeleteAsync(subbook.StripeCouponId, null, null, cancellationToken);

    await _stripeClient.V1.Prices.UpdateAsync(subbook.StripePriceId, 
      new () { Active = false }, null, cancellationToken);

    await _stripeClient.V1.Products.UpdateAsync(subbook.StripeProductId, 
      new () { Active = false }, null, cancellationToken);

    var deletingResult = _dbContext.Subbooks.Remove(subbook);  

    await _dbContext.SaveChangesAsync(cancellationToken);

    if (!book.Subbooks.Any(s => s.Format.HasFlag(subbook.Format)))
      book.Formats -= subbook.Format;

    if (!book.Subbooks.Any(s => s.Language.HasFlag(subbook.Language)))
      book.Languages -= subbook.Language;

    if (subbook.Format != BookFormat.Paper)
      await _supabaseClient.Storage
        .From(SupabaseBucketsNames.Private)
        .Remove(subbook.FilePath);

    await _supabaseClient.Storage
      .From(SupabaseBucketsNames.Public)
      .Remove(subbook.IntroductionFilePath);

    await _dbContext.SaveChangesAsync(cancellationToken);

    return deletingResult.Entity.Id;
  }
}