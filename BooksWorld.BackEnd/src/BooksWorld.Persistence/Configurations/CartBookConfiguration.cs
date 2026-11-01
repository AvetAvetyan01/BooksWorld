using System.Text.Json;
using BooksWorld.Domain.Common;
using BooksWorld.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BooksWorld.Persistence.Configurations;

public class CartBookConfiguration : IEntityTypeConfiguration<CartBook>
{
  private readonly JsonSerializerOptions _jsonSerializationOptions = new ();

  public void Configure(EntityTypeBuilder<CartBook> builder)
  {
    builder.Property(b => b.UserId);
    builder.Property(b => b.BookId);
    builder.Property(b => b.BookFormat);
    builder.Property(b => b.Quantity);
    builder.Property(b => b.SubbookId);
    builder.Property(b => b.BookImgUrl);

    builder.HasOne(b => b.Subbook);

  }
}