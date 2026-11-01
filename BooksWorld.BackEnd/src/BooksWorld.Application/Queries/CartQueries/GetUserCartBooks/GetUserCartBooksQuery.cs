using BooksWorld.Domain.Enums;
using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.CartQueries.GetUserCartBooks;

public record GetUserCartBooksQuery(Guid UserId, Currency Currency) : IRequest<IEnumerable<CartBook>>;