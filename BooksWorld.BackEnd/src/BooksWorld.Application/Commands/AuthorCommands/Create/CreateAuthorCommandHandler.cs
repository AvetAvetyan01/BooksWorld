using BooksWorld.Application.Common.Extensions;
using BooksWorld.Application.Common.Constants;
using BooksWorld.Persistence.DataProviders;
using System.Text.RegularExpressions;
using BooksWorld.Domain.Models;
using MapsterMapper;
using MediatR;

namespace BooksWorld.Application.Commands.AuthorCommands.Create;

public class CreateAuthorCommandHandler(
  IMapper mapper, 
  Supabase.Client supabaseClient,
  ApplicationDbContext dbContext
) 
  : IRequestHandler<CreateAuthorCommand, int>
{
  private readonly IMapper _mapper = mapper;
  private readonly Supabase.Client _supabaseClient = supabaseClient;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<int> Handle(CreateAuthorCommand command, CancellationToken cancellationToken)
  {
    var author = _mapper.Map<Author>(command);

    ArgumentNullException.ThrowIfNull(command.Image);

    var imagePath = $"images/authors/{Regex.Replace(
          author.FullName_EN.Replace(' ', '_'),
          $"[{Regex.Escape(new string(['/','\\',':','<','>','|',':','?','*']))}]",
          "-")}-{Guid.NewGuid()}.jpg";

    var imageBytes = await command.Image.GetFileBytes(cancellationToken);

    author.ImagePath = imagePath;

    var creatingResult = await _dbContext.Authors.AddAsync(author, cancellationToken);

    await _supabaseClient.Storage
      .From(SupabaseBucketsNames.Public)
      .Upload(
        imageBytes, 
        imagePath,
        new () { Upsert = true }, 
        cancellationToken: cancellationToken
      );    

    await _dbContext.SaveChangesAsync(cancellationToken);

    return creatingResult.Entity.Id;
  }
}
