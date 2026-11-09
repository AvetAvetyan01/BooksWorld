using BooksWorld.Domain.Models.BookModels;
using MediatR;

namespace BooksWorld.Application.Queries.SubbookQueries.GetById;

public record GetSubbookByIdQuery(int Id) : IRequest<Subbook?>;