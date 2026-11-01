using BooksWorld.Domain.Models;
using MediatR;

namespace BooksWorld.Application.Queries.StatisticsQueries.GetBookGrades;

public record GetBookGradesQuery(int BookId) : IRequest<Dictionary<int, int>>;