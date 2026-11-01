using BooksWorld.Application.Queries.UserQueries.GetBoughtSubbooks;
using BooksWorld.Application.Commands.UserCommands.DeleteLikedBook;
using BooksWorld.Application.Commands.UserCommands.AddLikedBook;
using BooksWorld.Application.Commands.UserCommands.Register;
using BooksWorld.Application.Commands.UserCommands.Login;
using BooksWorld.Application.Queries.UserQueries.GetById;
using BooksWorld.Infrastructure.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MapsterMapper;
using MediatR;

namespace BooksWorld.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController
  (IMediator mediator, IMapper mapper) : ControllerBase 
{
  private readonly IMapper _mapper = mapper;
  private readonly IMediator _mediator = mediator;

  [HttpPost("register")]
  public async Task<IResult> Register(RegisterUserRequest request)
  {
    var command = _mapper.Map<RegisterUserCommand>(request);
    var response = await _mediator.Send(command);

    Response.Cookies.Append(CookieNames.Access_Token_Name,  response.AccessToken);
    Response.Cookies.Append(CookieNames.Refresh_Token_Name, response.RefreshToken);

    return Results.Ok(response.UserDTO);
  }

  [HttpPost("login")]
  public async Task<IResult> Login(LoginUserRequest request)
  {
    var command = _mapper.Map<LoginUserCommand>(request);
    var response = await _mediator.Send(command);

    Response.Cookies.Append(CookieNames.Access_Token_Name,  response.AccessToken);
    Response.Cookies.Append(CookieNames.Refresh_Token_Name, response.RefreshToken);

    return Results.Ok(response.UserDTO);
  }

  [Authorize]
  [HttpGet("me/boughts")]
  public async Task<IResult> GetUserBoughtBooks()
  {
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User Id Not Found");

    var query = new GetUserBoughtSubbooksQuery(Guid.Parse(userId));
    var response = await _mediator.Send(query);

    return Results.Ok(response);
  } 

  [HttpGet("role")]
  public async Task<IResult> GetRole() => 
    await Task.Run(() => Results.Ok(User.FindFirstValue(ClaimTypes.Role)));
  
  [HttpGet("me")]
  public async Task<IResult> GetUserInfo()
  {
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User Id Not Found");

    var query = new GetUserInfoQuery(Guid.Parse(userId));
    var response = await _mediator.Send(query);

    return Results.Ok(response);
  } 

  [Authorize]
  [HttpPost("logout")]
  public IResult Logout()
  {
    Response.Cookies.Delete(CookieNames.Access_Token_Name);
    Response.Cookies.Delete(CookieNames.Refresh_Token_Name);

    return Results.NoContent();
  }
  
  [Authorize]
  [HttpPost("/api/likeds")]
  public async Task<IResult> LikeBookAsync(AddLikedBookRequest request)
  {
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User Id Not Found");

    var command = new AddLikedBookCommand(Guid.Parse(userId), request.BookId);
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }

  [Authorize]
  [HttpDelete("/api/likeds/{BookId}")]
  public async Task<IResult> UnlikeBookAsync(int BookId)
  { 
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User Id Not Found");

    var command = new DeleteLikedBookCommand(Guid.Parse(userId), BookId);
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }
}