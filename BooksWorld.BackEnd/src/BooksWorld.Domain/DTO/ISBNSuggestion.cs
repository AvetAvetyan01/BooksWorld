namespace BooksWorld.Domain.DTO;

public record ISBNSuggestion(
  int BookId,
  int ISBN,
  string Title
);