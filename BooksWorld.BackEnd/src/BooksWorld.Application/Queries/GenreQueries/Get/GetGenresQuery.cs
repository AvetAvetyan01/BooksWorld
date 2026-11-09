using BooksWorld.Domain.Enums.SearchTypes;
using BooksWorld.Domain.Collections;
using BooksWorld.Domain.DTO.Cards;
using BooksWorld.Domain.Enums;
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
: IRequest<PagedCollection<GenreCard>>;