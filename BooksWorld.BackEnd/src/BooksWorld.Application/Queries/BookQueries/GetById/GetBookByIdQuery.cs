using BooksWorld.Domain.Models.BookModels;
using MediatR;

namespace BooksWorld.Application.Queries.BookQueries.GetById;

public sealed record GetBookByIdQuery(int Id) : IRequest<Book?>;