using BooksWorld.Application.Queries.SubbookQueries.GetBookSubbooks;
using BooksWorld.Application.Commands.SubbookCommands.Common;
using BooksWorld.Application.Commands.SubbookCommands.Create;
using BooksWorld.Application.Commands.SubbookCommands.Delete;
using BooksWorld.Application.Commands.SubbookCommands.Update;
using BooksWorld.Application.Queries.SubbookQueries.GetById;
using BooksWorld.API.Extensions;
using Microsoft.AspNetCore.Mvc;
using BooksWorld.Domain.Enums;
using MapsterMapper;
using MediatR;

namespace BooksWorld.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubbooksController
  (IMediator mediator, IMapper mapper) : ControllerBase
{
  private readonly IMapper _mapper = mapper;
  private readonly IMediator _mediator = mediator;

  [HttpGet("/api/books/{bookId}/subbooks")]
  public async Task<IResult> GetBookSubbooksAsync
    (int bookId, [FromQuery] Currency currency, [FromQuery] int? discountPercent)
  {
    var query = new GetBookSubbooksQuery(bookId, currency, discountPercent);
    var result = await _mediator.Send(query);

    return Results.Ok(result);
  }

  [HttpPost]
  [RequiredRoles(UserRole.Admin)]
  public async Task<IResult> CreateAsync([FromForm] SubbookModelRequest request)
  {
    var command = _mapper.Map<CreateSubbookCommand>(request);
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }

  [HttpGet("{id}")]
  public async Task<IResult> GetByIdAsync(int id)
  {
    var query = new GetSubbookByIdQuery(id);
    var subbook = await _mediator.Send(query);

    return Results.Ok(subbook);
  }

  [HttpPut("{id}")]
  [RequiredRoles(UserRole.Admin)]
  public async Task<IResult> UpdateAsync(int id,[FromForm] SubbookModelRequest request)
  {
    var command = _mapper.Map<UpdateSubbookCommand>(request) with { Id = id };
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }

  [HttpDelete("{id}")]
  [RequiredRoles(UserRole.Admin)]
  public async Task<IResult> DeleteAsync(int id)
  {
    var command = new DeleteSubbookCommand(id);
    await _mediator.Send(command);

    return Results.NoContent();
  }
}