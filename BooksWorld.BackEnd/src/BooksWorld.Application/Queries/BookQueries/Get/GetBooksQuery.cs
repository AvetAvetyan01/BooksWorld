using BooksWorld.Domain.FiltrationModels;
using BooksWorld.Domain.Collections;
using BooksWorld.Domain.DTO.Cards;
using BooksWorld.Domain.Enums;
using MediatR;

namespace BooksWorld.Application.Queries.BookQueries.Get;

public sealed record GetBooksQuery
(
  int Page, 
  int Size,
  BooksFilter Filter,
  SortingType SortBy,
  bool ByAscending
) 
: IRequest<PagedCollection<BookCard>>;