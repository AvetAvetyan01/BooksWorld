using Microsoft.AspNetCore.Http;
using MediatR;

namespace BooksWorld.Application.Commands.BookCommands.Create;

public sealed record CreateBookCommand
(
  IFormFile   Image,
  int         AuthorId,
  int         GenreId,
  int?        DiscountPercent,
  DateTime?   DiscountDeadline,
  string      Title_AM,
  string      Title_EN,
  string      Title_RU,
  string      Description_AM,
  string      Description_EN,
  string      Description_RU
) : IRequest<int>;
