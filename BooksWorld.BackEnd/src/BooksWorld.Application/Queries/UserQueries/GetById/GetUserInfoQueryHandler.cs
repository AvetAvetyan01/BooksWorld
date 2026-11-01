using BooksWorld.Application.Commands.UserCommands.Common;
using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace BooksWorld.Application.Queries.UserQueries.GetById;

public class GetUserInfoQueryHandler
  (ApplicationDbContext dbContext) 
  : IRequestHandler<GetUserInfoQuery, UserInfo?>
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<UserInfo?> Handle(GetUserInfoQuery query, CancellationToken cancellationToken)
  {
    var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == query.UserId, cancellationToken)
      ?? throw new Exception($"User Not Found By Given ID ({query.UserId})");

    var userInfo = new UserInfo(user.Email, user.Phone);

    return userInfo;
  }
}
