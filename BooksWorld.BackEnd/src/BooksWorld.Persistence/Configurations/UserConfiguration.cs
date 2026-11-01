using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;

namespace BooksWorld.Persistence.Configurations;

public partial class UserConfiguration : IEntityTypeConfiguration<User>
{
  public void Configure(EntityTypeBuilder<User> builder)
  {
    // builder.HasIndex(u => u.Email).IsUnique();

    builder.HasKey(u => u.Id);

    builder.Property(u => u.Name).HasMaxLength(30);
    builder.Property(u => u.Email).HasMaxLength(200);
    builder.Property(u => u.Phone).HasMaxLength(50);
  }
}