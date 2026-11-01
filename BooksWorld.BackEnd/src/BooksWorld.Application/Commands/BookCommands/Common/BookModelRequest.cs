using Microsoft.AspNetCore.Http;

namespace BooksWorld.Application.Commands.BookCommands.Common;

public sealed record BookModelRequest
(
  IFormFile?      Image,
  int             AuthorId,
  int             GenreId,
  int?            DiscountPercent,
  DateTime?       DiscountDeadline,
  string          Title_AM,
  string          Title_EN,
  string          Title_RU,
  string          Description_AM,
  string          Description_EN,
  string          Description_RU
);