using BooksWorld.Application.Commands.CheckoutCommands.CheckoutSessionWebhook;
using BooksWorld.Application.Commands.CheckoutCommands.CreateSession;
using BooksWorld.Application.Queries.CheckoutQueries.GetStatus;
using BooksWorld.Infrastructure.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MediatR;
using Stripe;

namespace BooksWorld.API.Controllers;

[ApiController]
[Route("api/")]
public class CheckoutController
  (StripeClient client, IMediator mediator) : ControllerBase
{
  private readonly StripeClient _client = client;
  private readonly IMediator _mediator = mediator;

  [HttpPost("checkout/webhook")]
  public async Task<IResult> GetWebHook()
  {
    var command = new CheckoutSessionWebhookCommand
    (
      RequestBody: Request.Body,
      SignatureHeader: Request.Headers["Stripe-Signature"]
    );

    var isSuccessed = await _mediator.Send(command);

    return isSuccessed ? Results.Ok() : Results.BadRequest();      
    // return isSuccessed ? Results.Ok() : Results.Unauthorized();      
  }

  [Authorize]
  [HttpPost("checkout/session")]
  public async Task<IResult> Create()
  {
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User ID Not Found");

    var query = new CreateCheckoutSessionCommand(Guid.Parse(userId));
    var clientSecret = await _mediator.Send(query);

    return Results.Ok(clientSecret);
  }  

  [Authorize]
  [HttpGet("checkout/session/{sessionId}")]
  public async Task<IResult> GetStatus(string sessionId) 
  {
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User ID Not Found");

    var query = new GetCheckoutSessionStatusQuery(sessionId, Guid.Parse(userId));
    var status = await _mediator.Send(query);

    return Results.Ok(status);
  }
}