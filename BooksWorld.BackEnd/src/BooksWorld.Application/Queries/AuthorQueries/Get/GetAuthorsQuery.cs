using BooksWorld.Domain.Collections;
using BooksWorld.Domain.DTO.Cards;
using BooksWorld.Domain.FiltrationModels;
using MediatR;

namespace BooksWorld.Application.Queries.AuthorQueries.Get;

public record GetAuthorsQuery
(
  int Page,
  int Size,
  AuthorsFilter Filter
) 
: IRequest<PagedCollection<AuthorCard>>;