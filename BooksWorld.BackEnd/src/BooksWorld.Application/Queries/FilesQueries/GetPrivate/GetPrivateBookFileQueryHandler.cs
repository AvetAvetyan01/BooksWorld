using BooksWorld.Application.Common.Constants;
using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Enums;
using MediatR;

namespace BooksWorld.Application.Queries.FilesQueries.GetPrivate;

public class GetPrivateBookFileQueryHandler
  (Supabase.Client supabaseClient, ApplicationDbContext dbContext) 
  : IRequestHandler<GetPrivateBookFileQuery, string?>
{
  private readonly ApplicationDbContext _dbContext = dbContext;
  private readonly Supabase.Client _supabaseClient = supabaseClient;

  public async Task<string?> Handle(GetPrivateBookFileQuery query, CancellationToken cancellationToken)
  {
    var requestingUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == query.UserId, cancellationToken)
      ?? throw new Exception($"User Not Found By Id ({query.UserId})");

    if (requestingUser.Role != UserRole.Admin)
    {
      var userBoughtSubbooksIds = _dbContext.BuyedSubbooks
        .Where(s => s.UserId == requestingUser.Id)
        .Select(s => s.SubbookId);

      if (!userBoughtSubbooksIds.Contains(query.SubbookId)) 
        throw new Exception($"User Don't Have Access To This File (UserId: {query.UserId}, Subbook: {query.SubbookId})");
    }

    var subbook = await _dbContext.Subbooks
      .FirstOrDefaultAsync(sb => sb.Id == query.SubbookId, cancellationToken)
      ?? throw new Exception($"Subbook Not Found (Subbook: {query.SubbookId})");
    
    Console.ForegroundColor = ConsoleColor.Green;
    System.Console.WriteLine(subbook.FilePath);
    Console.ResetColor();

    var signedUrl = await _supabaseClient
      .Storage
      .From(SupabaseBucketsNames.Private)
      .CreateSignedUrl(subbook.FilePath, 30); 
    
    return signedUrl;
  }
}