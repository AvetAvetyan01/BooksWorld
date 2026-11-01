using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Models.BookModels;
using MediatR;

namespace BooksWorld.Application.Queries.SubbookQueries.GetBookSubbooks;

public record GetBookSubbooksQuery(
  int BookId,
  Currency Currency,
  int? DiscountPercent
) : IRequest<IEnumerable<Subbook>>;