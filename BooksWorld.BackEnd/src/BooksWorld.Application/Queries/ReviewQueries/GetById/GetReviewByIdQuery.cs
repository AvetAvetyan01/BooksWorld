using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.ReviewQueries.GetById;

public sealed record GetReviewByIdQuery(int ReviewId) : IRequest<Review?>;
