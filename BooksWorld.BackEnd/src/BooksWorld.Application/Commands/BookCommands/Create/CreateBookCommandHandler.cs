using BooksWorld.Persistence.DataProviders;
using BooksWorld.Application.Common.Extensions;
using BooksWorld.Application.Common.Constants;
using BooksWorld.Domain.Models.BookModels;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Enums;
using MapsterMapper;
using MediatR;
using System.Text.RegularExpressions;

namespace BooksWorld.Application.Commands.BookCommands.Create;

public class CreateBookCommandHandler(
  IMapper mapper,
  IConfiguration configuration,
  Supabase.Client supabaseClient,
  ApplicationDbContext dbContext
) 
  : IRequestHandler<CreateBookCommand, int>
{
  private readonly IMapper _mapper = mapper;
  private readonly IConfiguration _configuration = configuration;
  private readonly Supabase.Client _supabaseClient = supabaseClient;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(CreateBookCommand command, CancellationToken cancelationToken)
  {
    var book = _mapper.Map<Book>(command);

    ArgumentNullException.ThrowIfNull(command.Image);

    book.Genre = await _dbContext.Genres.FirstOrDefaultAsync(g => g.Id == command.GenreId, cancelationToken)
      ?? throw new Exception($"Genre Not Found By Given ID ({command.GenreId})");
    
    book.Author = await _dbContext.Authors.FirstOrDefaultAsync(a => a.Id == command.AuthorId, cancelationToken)
      ?? throw new Exception($"Author Not Found By Given ID ({command.AuthorId})");

    book.DiscountDeadline = book.DiscountPercent != null ? command.DiscountDeadline : null;

    book.Rating = 0;
    book.GradesCount = 0;

    // probably we don't need to add Guid in the last of file name
    var imagePath = $"images/books/{Regex.Replace(
          book.Title_EN.Replace(' ', '_'),
          $"[{Regex.Escape(new string(['/','\\',':','<','>','|',':','?','*']))}]",
          "-")}-{Guid.NewGuid()}.jpg";

    var imageBytes = await command.Image.GetFileBytes(cancelationToken);

    book.ImagePath = imagePath;
    book.ImageUrl = $"{_configuration["SupabaseOptions:Url"]}/storage/v1/object/public/{SupabaseBucketsNames.Public}/{imagePath}";

    var creatingResult = await _dbContext.Books.AddAsync(book, cancelationToken);

    await _supabaseClient.Storage
      .From(SupabaseBucketsNames.Public)
      .Upload(
        imageBytes, 
        imagePath, 
        new () { Upsert = true, }, 
        cancellationToken: cancelationToken
      );

    await _dbContext.SaveChangesAsync(cancelationToken);

    return creatingResult.Entity.Id;
  }
}
