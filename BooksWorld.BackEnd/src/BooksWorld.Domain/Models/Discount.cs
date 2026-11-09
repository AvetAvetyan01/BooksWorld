namespace BooksWorld.Domain.Models;

// in future we need to remove deadline in there
public record Discount
(
  int Id,
  int Percent,
  DateTime? Deadline
);