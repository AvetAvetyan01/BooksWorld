using System.Text.Json;
using BooksWorld.Domain.Models.BookModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BooksWorld.Persistence.Configurations;

public class SubbookConfiguration : IEntityTypeConfiguration<Subbook>
{
  private readonly JsonSerializerOptions _jsonSerzializationOptions = new ();

  public void Configure(EntityTypeBuilder<Subbook> builder)
  {
    builder.HasKey(a => a.Id);

    builder.Property(a => a.BookId);
    builder.Property(a => a.Language);
    builder.Property(a => a.Year).HasMaxLength(DateTime.UtcNow.Day);
    builder.Property(a => a.Price);
    builder.Property(a => a.Publisher).HasMaxLength(150);
    builder.Property(a => a.IntroductionFilePath);
    builder.Property(a => a.FilePath);
    builder.Property(a => a.Details)
      .HasColumnType("jsonb")
      .HasConversion(
        v => JsonSerializer.Serialize(v, _jsonSerzializationOptions),
        v => JsonSerializer.Deserialize<object>(v, _jsonSerzializationOptions)!
      );
  }
}