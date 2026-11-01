using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Enums.SearchTypes;

namespace BooksWorld.Application.Queries.GenreQueries.Get;

public record GetGenresRequest
(
  int Page, 
  int Size,
  int? BaseId,
  string? Search,
  Language SearchLanguage,
  GenresSearchField SearchField
);