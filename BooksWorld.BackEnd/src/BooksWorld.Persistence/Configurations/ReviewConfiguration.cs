using BooksWorld.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BooksWorld.Persistence.Configurations;

public class ReviewConfiguration : IEntityTypeConfiguration<Review>
{
  public void Configure(EntityTypeBuilder<Review> builder)
  {
    builder.HasKey(r => r.Id);

    builder.Property(r => r.BookId);
    builder.Property(r => r.UserId);
    builder.Property(r => r.UserName);
    builder.Property(r => r.Grade);
    builder.Property(r => r.Comment).HasMaxLength(1000);
  }
}