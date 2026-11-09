using BooksWorld.Domain.Enums;

namespace BooksWorld.Domain.DTO.Cards;

public record BookCard
(
  int         Id,
  string      ImagePath,
  string      Title,
  int         AuthorId,
  string      AuthorFullName,
  double      Rating,
  int?        DiscountPercent,
  Language    Languages,
  BookFormat  Formats
);