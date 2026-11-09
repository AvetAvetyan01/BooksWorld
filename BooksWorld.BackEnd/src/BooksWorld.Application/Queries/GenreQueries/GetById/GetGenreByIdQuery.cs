using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.GenreQueries.GetById;

public sealed record GetGenreByIdQuery(int Id) : IRequest<Genre?>;
