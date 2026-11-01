using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.OrderQueries.GetById;

public sealed record GetOrderByIdQuery(int Id) : IRequest<Order?>;
