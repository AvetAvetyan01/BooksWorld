namespace BooksWorld.Domain.Models.BookModels.SubbooksDetailsModels;

public record BoughtSubbook
(
  int  Id,
  Guid UserId,
  int  BookId,
  int  SubbookId,
  int? Quantity
);