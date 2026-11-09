using BooksWorld.Application.Commands.UserCommands.Common;
using BooksWorld.Persistence.DataProviders;
using BooksWorld.Domain.Interfaces.Auth;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using BooksWorld.Domain.Enums;
using MapsterMapper;
using MediatR;

namespace BooksWorld.Application.Commands.UserCommands.Register;

public class RegisterUserCommandHandler(
  IMapper mapper,
  IPasswordHasher passwordHasher,
  IJwtProvider jwtProvider,
  ApplicationDbContext dbContext
) : IRequestHandler<RegisterUserCommand, UserResponse>
{
  private readonly IMapper _mapper = mapper;
  private readonly IPasswordHasher _passwordHasher = passwordHasher;
  private readonly IJwtProvider _jwtProvider = jwtProvider;
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<UserResponse> Handle
    (RegisterUserCommand command, CancellationToken cancellationToken)
  {
    var userIsExists = await _dbContext.Users
      .FirstOrDefaultAsync(u => u.Email == command.Email, cancellationToken) is not null;

    if (userIsExists) throw new Exception($"User Is Exists With This email ({command.Email})");
    
    var user = _mapper.Map<User>(command);
    
    user.Role = UserRole.User;
    user.PasswordHash = _passwordHasher.Generate(command.Password);

    await _dbContext.Users.AddAsync(user, cancellationToken);

    var accessToken  = _jwtProvider.GenerateAccessToken(user.Id, user.Role);
    var refreshToken = _jwtProvider.GenerateRefreshToken();

    await _dbContext.UsersRefreshTokens.AddAsync(new ()
    {
      IsRevoked = false,
      IsUsed = false,
      Value = refreshToken,
      UserId = user.Id      
    }, 
    cancellationToken);

    await _dbContext.SaveChangesAsync(cancellationToken);

    var response = new UserResponse(
      UserDTO: _mapper.Map<UserDTO>(user) with {
        LikedBooksIds = [],
        CartBooks = []
      },
      AccessToken: accessToken,
      RefreshToken: refreshToken  
    );
    
    return response;
  }
}