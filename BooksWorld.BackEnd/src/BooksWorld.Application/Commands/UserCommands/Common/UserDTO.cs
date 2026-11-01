namespace BooksWorld.Application.Commands.UserCommands.Common;

public sealed record UserDTO
(
  string    Name,
  ICollection<int> LikedBooksIds,
  ICollection<CartBookDTO> CartBooks
);
