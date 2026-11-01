using BooksWorld.Application.Queries.CartQueries.GetUserCartBooks;
using BooksWorld.Application.Commands.CartCommands.UpdateCount;
using BooksWorld.Application.Commands.CartCommands.Create;
using BooksWorld.Application.Commands.UserCommands.Common;
using BooksWorld.Application.Commands.CartCommands.Delete;
using BooksWorld.Infrastructure.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BooksWorld.Domain.Enums;
using System.Security.Claims;
using MapsterMapper;
using MediatR;

namespace BooksWorld.API.Controllers;

[ApiController]
[Route("api/users/")]
public class CartsController
  (IMapper mapper, IMediator mediator) : ControllerBase
{
  private readonly IMapper _mapper = mapper;
  private readonly IMediator _mediator = mediator;

  [Authorize]
  [HttpGet("cart")]
  public async Task<IResult> GetCartBooksAsync([FromQuery]Currency currency)
  {
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User Id Not Found");

    var query = new GetUserCartBooksQuery(UserId: Guid.Parse(userId), currency);
    var cartBooks = await _mediator.Send(query);

    return Results.Ok(cartBooks);
  }

  [Authorize]
  [HttpPost("cart")]
  public async Task<IResult> AddCartBookAsync(CreateCartBookRequest request)
  {
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User Id Not Found");

    var command = new CreateCartBookCommand(Guid.Parse(userId), request.SubbookId);
    var cartBook = await _mediator.Send(command);

    var reducedCartBook = _mapper.Map<CartBookDTO>(cartBook);

    return reducedCartBook is not null ? Results.Ok(reducedCartBook) : Results.Problem();
  }

  [Authorize]
  [HttpPatch("cart/{cartBookId}")] 
  public async Task<IResult> UpdateCartBookCountAsync(int cartBookId, UpdateCartBookCountRequest request)
  {
    var command = _mapper.Map<UpdateCartBookCountCommand>(request) with { CartBookId = cartBookId };
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  } 

  
  [HttpDelete("cart/{cartBookId}")]
  public async Task<IResult> DeleteCartBookAsync(int cartBookId)
  {
    var command = new DeleteCartBookCommand(CartBookId: cartBookId);
    var result = await _mediator.Send(command);
    
    return Results.Ok(result);
  }
}