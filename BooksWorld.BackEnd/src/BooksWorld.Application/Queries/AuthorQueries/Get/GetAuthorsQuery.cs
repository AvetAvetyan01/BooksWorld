using BooksWorld.Domain.Collections;
using BooksWorld.Domain.FiltrationModels;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.AuthorQueries.Get;

public record GetAuthorsQuery
(
  int Page,
  int Size,
  AuthorsFilter Filter
) 
: IRequest<PagedCollection<Author>>;