using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Common;
using BooksWorld.Domain.Models;
using BooksWorld.Domain.Enums;
using System.Text.Json;

namespace BooksWorld.Persistence.Configurations;

public class GenreConfiguration : IEntityTypeConfiguration<Genre>
{
  private readonly JsonSerializerOptions _jsonSerializationOptions = new ();

  public void Configure(EntityTypeBuilder<Genre> builder)
  {
    builder.HasKey(g => g.Id);

    builder.Property(g => g.BaseId);
    builder.Property(g => g.BasesIds);
    builder.Property(g => g.SubgenresCount);

    // builder.HasMany(g => g.Subgenres);

    // we need to create converter for saving children array as string format and convert it to int array.
    // that we need to do because recoursive call of children is so hard insted children ids in every genre
    builder.HasData([
      new Genre
      {
        Id = 1,
        BasesIds = [],
        Name_AM = "Ժանրներ",
        Name_EN = "Genres",
        Name_RU = "Жанры"
        // Subgenres = [],
        // SubgenresCount = 0
      }
    ]);
    // builder.HasData([
    //   new Genre
    //   {
    //     Id = 1,
    //     BasesIds = [],
    //     Name = new ()
    //     {
    //       { Language.Armenian, "Ժանրներ" },
    //       { Language.English, "Genres" },
    //       { Language.Russian, "Жанры" }
    //     }
    //     // Subgenres = [],
    //     // SubgenresCount = 0
    //   }
    // ]);
  }
}