using BooksWorld.Application.Commands.AuthorCommands.Common;
using BooksWorld.Application.Commands.AuthorCommands.Create;
using BooksWorld.Application.Commands.AuthorCommands.Delete;
using BooksWorld.Application.Commands.AuthorCommands.Update;
using BooksWorld.Application.Queries.AuthorQueries.GetSuggestions;
using BooksWorld.Application.Queries.AuthorQueries.GetById;
using BooksWorld.Application.Queries.AuthorQueries.Get;
using Microsoft.AspNetCore.Mvc;
using BooksWorld.API.Extensions;
using BooksWorld.Domain.Enums;
using MapsterMapper;
using MediatR;

namespace BooksWorld.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthorsController
  (IMediator mediator, IMapper mapper) : ControllerBase
{
  private readonly IMediator _mediator = mediator;
  private readonly IMapper _mapper = mapper;

  [HttpGet("suggestions/")]
  public async Task<IResult> GetSuggestionsAsync([FromQuery] GetAuthorsSuggestionsRequest request)
  {
    var query = _mapper.Map<GetAuthorSuggestionsQuery>(request);
    var suggestions = await _mediator.Send(query);

    return Results.Ok(suggestions);
  }

  [HttpGet]
  public async Task<IResult> GetAsync([FromQuery] GetAuthorsRequest request)
  {
    var query = _mapper.Map<GetAuthorsQuery>(request);
    var books = await _mediator.Send(query);

    return Results.Ok(books);
  }

  [HttpPost]
  [RequiredRoles(UserRole.Admin)]
  public async Task<IResult> CreateAsync([FromForm] AuthorModelRequest request)
  {
    var command = _mapper.Map<CreateAuthorCommand>(request);
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }

  [HttpGet("{id}")]
  public async Task<IResult> GetByIdAsync(int id)
  {
    var command = new GetAuthorByIdQuery(id);
    var author = await _mediator.Send(command);

    return Results.Ok(author);
  }

  [HttpPut("{id}")]
  [RequiredRoles(UserRole.Admin)]
  public async Task<IResult> UpdateAsync(int id,[FromForm] AuthorModelRequest request)
  {
    var command = _mapper.Map<UpdateAuthorCommand>(request) with { Id = id };
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }

  [HttpDelete("{id}")]
  [RequiredRoles(UserRole.Admin)]
  public async Task<IResult> DeleteAsync(int id)
  {
    var command = new DeleteAuthorCommand(id);
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }
}