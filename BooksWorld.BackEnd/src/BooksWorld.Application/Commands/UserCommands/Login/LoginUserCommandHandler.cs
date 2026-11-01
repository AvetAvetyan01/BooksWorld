using BooksWorld.Application.Commands.UserCommands.Common;
using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Interfaces.Auth;
using Microsoft.EntityFrameworkCore;
using MapsterMapper;
using MediatR;

namespace BooksWorld.Application.Commands.UserCommands.Login;

public class LoginUserCommandHandler(
  IMapper mapper,
  IJwtProvider jwtProvider,
  IPasswordHasher passeordHasher,
  ApplicationDbContext dbContext
) : IRequestHandler<LoginUserCommand, UserResponse>
{
  private readonly IMapper _mapper = mapper;
  private readonly IJwtProvider _jwtProvider = jwtProvider;
  private readonly IPasswordHasher _passeordHasher = passeordHasher;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<UserResponse> Handle(LoginUserCommand command, CancellationToken cancellationToken)
  {
    var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == command.Email, cancellationToken)
      ?? throw new Exception($"User Not Found By Given Email ({command.Email})");

    if (!_passeordHasher.Verify(command.Password, user.PasswordHash))
      throw new Exception("Inconsistent User Password");

    var accessToken  = _jwtProvider.GenerateAccessToken(user.Id, user.Role);
    var refreshToken = _jwtProvider.GenerateRefreshToken();

    await _dbContext.UsersRefreshTokens.AddAsync(new () 
    {
      IsUsed = false,
      IsRevoked = false,
      Value = refreshToken,
      UserId = user.Id
    }, 
    cancellationToken);

    await _dbContext.SaveChangesAsync(cancellationToken);

    var userCartBooks = _dbContext.CartBooks
      .Include(cb => cb.Subbook)
      .Where(cb => cb.UserId == user.Id)
      .OrderBy(cb => cb.Id);

    var userLikedBooksIds = _dbContext.LikedBooks
      .Where(lb => lb.UserId == user.Id)
      .Select(lb => lb.BookId)
      .ToArray();

    var reducedUserCartBooks = _mapper.Map<ICollection<CartBookDTO>>(userCartBooks);

    var response = new UserResponse(
      UserDTO: new UserDTO (
        Name: user.Name,
        CartBooks: reducedUserCartBooks,
        LikedBooksIds: userLikedBooksIds
      ),
      AccessToken: accessToken,
      RefreshToken: refreshToken
    );

    return response;
  }
}