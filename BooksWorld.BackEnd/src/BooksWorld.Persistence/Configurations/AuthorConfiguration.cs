using System.Text.Json;
using BooksWorld.Domain.Common;
using BooksWorld.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BooksWorld.Persistence.Configurations;

public class AuthorConfiguration : IEntityTypeConfiguration<Author>
{
  private readonly JsonSerializerOptions _jsonSerializationOptions = new ();

  public void Configure(EntityTypeBuilder<Author> builder)
  {
    builder.HasKey(a => a.Id);

    // builder.Property(a => a.FullName);
    builder.Property(a => a.ImagePath);
    // builder.Property(a => a.Autobiographical);

    // builder.Property(b => b.FullName)
    //   .HasConversion(
    //     // probably we need to set 'v' to 'v.AsEnumerable()'
    //     v => JsonSerializer.Serialize(v, _jsonSerializationOptions),
    //     v => JsonSerializer.Deserialize<Translations>(v, _jsonSerializationOptions)!
    //   );
  }
}