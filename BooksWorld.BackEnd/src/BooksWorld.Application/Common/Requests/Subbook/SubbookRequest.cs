using BooksWorld.Domain.Enums;

namespace BooksWorld.Application.Common.Requests.Subbook;

public record SubbookRequest
(
  int BookId,
  Language Language,
  int Year,
  int Price,
  string Publisher
);