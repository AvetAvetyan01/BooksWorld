using BooksWorld.Domain.Collections;
using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.GenreQueries.Get;

public record GetGenresQuery 
(
  int Page, 
  int Size,
  int? BaseId,
  string? Search,
  Language Language,
  GenresSearchField SearchType
)
: IRequest<PagedCollection<Genre>>;