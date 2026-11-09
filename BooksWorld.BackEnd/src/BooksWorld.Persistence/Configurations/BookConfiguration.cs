using System.Text.Json;
using BooksWorld.Domain.Common;
using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Models.BookModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BooksWorld.Persistence.Configurations;

public class BookConfiguration : IEntityTypeConfiguration<Book>
{
  private readonly JsonSerializerOptions _jsonSerializationOptions = new ();

  public void Configure(EntityTypeBuilder<Book> builder)
  {
    // var comparer = new ValueComparer<Translations>(
    //   (c1, c2) => c1!.SequenceEqual(c2!),
    //   c => c.Aggregate(0, (acc, kv) => HashCode.Combine(acc, kv.Key, kv.Value)),
    //   c => (Translations)c.ToDictionary()
    // );

    // builder.HasIndex(b => b.Title).IsUnique();

    builder.HasKey(b => b.Id);

    builder.Property(b => b.ImageUrl);
    // builder.Property(b => b.Title);
    // builder.Property(b => b.Description);
    builder.Property(b => b.Languages);
    builder.Property(b => b.Formats);
    builder.Property(b => b.Rating);
    builder.Property(b => b.GradesCount);

    builder.HasOne(b => b.Genre);
    builder.HasOne(b => b.Author);

    builder.HasMany(b => b.Subbooks);

    // builder.Property(b => b.Title)
    //   .HasConversion(
    //     v => JsonSerializer.Serialize(v, _jsonSerializationOptions),
    //     v => JsonSerializer.Deserialize<Translations>(v, _jsonSerializationOptions)!
    //   );

    // builder.Property(b => b.Description)
    //   .HasConversion(
    //     v => JsonSerializer.Serialize(v, _jsonSerializationOptions),
    //     v => JsonSerializer.Deserialize<Translations>(v, _jsonSerializationOptions)!
    //   );
  }
}