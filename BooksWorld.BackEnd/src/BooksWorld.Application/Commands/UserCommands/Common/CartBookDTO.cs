namespace BooksWorld.Application.Commands.UserCommands.Common;

public record CartBookDTO
(
  int  Id,
  int  BookId,
  int  SubbookId,
  int? Quantity
);