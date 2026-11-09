using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.AuthorQueries.GetById;

public sealed record GetAuthorByIdQuery(int Id) : IRequest<Author>;
