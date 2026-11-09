using BooksWorld.Domain.Models.BookModels.SubbooksDetailsModels;
using MediatR;

namespace BooksWorld.Application.Queries.UserQueries.GetBoughtSubbooks;

public record GetUserBoughtSubbooksQuery(Guid UserId) : IRequest<IEnumerable<BoughtSubbook>>;