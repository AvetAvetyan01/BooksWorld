using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.GenreQueries.GetByBaseId;

public record GetGenresByBaseIdQuery(int BaseId) : IRequest<IEnumerable<Genre>>;