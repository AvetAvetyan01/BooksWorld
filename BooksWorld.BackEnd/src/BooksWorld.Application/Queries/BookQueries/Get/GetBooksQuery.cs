using BooksWorld.Domain.Collections;
using BooksWorld.Domain.Enums;
using BooksWorld.Domain.FiltrationModels;
using BooksWorld.Domain.Models.BookModels;
using MediatR;

namespace BooksWorld.Application.Queries.BookQueries.Get;

public sealed record GetBooksQuery
(
  // probably we need to add currency
  int Page, 
  int Size,
  BooksFilter Filter,
  SortingType SortBy,
  bool ByAscending
) 
: IRequest<PagedCollection<Book>>;