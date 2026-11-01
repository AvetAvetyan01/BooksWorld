using BooksWorld.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BooksWorld.Persistence.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(o => o.Id);

        builder.Property(o => o.UserId);
        builder.Property(o => o.ShippingAddress).HasMaxLength(400);
        builder.Property(o => o.Description).HasMaxLength(1000);
        builder.Property(o => o.TotalAmount);
        builder.Property(o => o.CreatedAt);
    }
}