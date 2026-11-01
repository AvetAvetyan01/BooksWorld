using BooksWorld.Application.Queries.FilesQueries.GetPrivate;
using BooksWorld.Infrastructure.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MediatR;

namespace BooksWorld.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FilesController(IMediator mediator) : ControllerBase
{
  private readonly IMediator _mediator = mediator;

  [Authorize]
  [HttpGet("private/books/{subbookId}")]
  public async Task<IResult> GetFile(int subbookId)
  {
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User Id Not Found");

    var query = new GetPrivateBookFileQuery(subbookId, Guid.Parse(userId));
    var response = await _mediator.Send(query);

    // return Results.File(response);
    return Results.Ok(response);
  }
}