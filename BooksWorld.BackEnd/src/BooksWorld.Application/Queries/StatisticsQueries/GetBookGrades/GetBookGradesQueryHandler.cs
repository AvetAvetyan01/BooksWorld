using BooksWorld.Persistence.DataProviders;
using MediatR;

namespace BooksWorld.Application.Queries.StatisticsQueries.GetBookGrades;

public class GetBookGradesQueryHandler
  (ApplicationDbContext dbContext)
: IRequestHandler<GetBookGradesQuery, Dictionary<int, int>>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<Dictionary<int,int>> Handle
    (GetBookGradesQuery query, CancellationToken cancellationToken) => await Task.Run(() =>
  {
    var grades = new Dictionary<int,int>{{1,0},{2,0},{3,0},{4,0},{5,0}};

    _dbContext.Reviews
      .Where(r => r.BookId == query.BookId).ToList()
      .ForEach(b => grades[(int)b.Grade] += 1); 

    return grades;
  });
}