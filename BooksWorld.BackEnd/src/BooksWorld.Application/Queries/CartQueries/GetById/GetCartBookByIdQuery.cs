using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.CartQueries.GetById;

public record GetCartBookByIdQuery(int Id) : IRequest<CartBook?>;