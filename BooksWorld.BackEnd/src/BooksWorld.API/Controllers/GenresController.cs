using BooksWorld.Application.Queries.GenreQueries.GetSuggestions;
using BooksWorld.Application.Queries.GenreQueries.GetByBaseId;
using BooksWorld.Application.Commands.GenreCommands.Common;
using BooksWorld.Application.Commands.GenreCommands.Create;
using BooksWorld.Application.Commands.GenreCommands.Delete;
using BooksWorld.Application.Commands.GenreCommands.Update;
using BooksWorld.Application.Queries.GenreQueries.GetById;  
using BooksWorld.Application.Queries.GenreQueries.Get;
using Microsoft.AspNetCore.Mvc;
using BooksWorld.API.Extensions;
using MapsterMapper;
using MediatR;
using BooksWorld.Domain.Enums;

namespace BooksWorld.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GenresController
  (IMediator mediator, IMapper mapper) : ControllerBase
{
  private readonly IMapper _mapper = mapper;
  private readonly IMediator _mediator = mediator;

  [HttpGet("suggestions/")]
  public async Task<IResult> GetSuggestionsAsync([FromQuery] GetGenresSuggestionsRequest request)
  {
    var query = _mapper.Map<GetGenresSuggestionsQuery>(request);
    var suggestions = await _mediator.Send(query);

    return Results.Ok(suggestions);
  }
  
  [HttpGet("{baseId}/subgenres")]
  public async Task<IResult> GetByBaseIdAsync(int baseId)
  {
    var query = new GetGenresByBaseIdQuery(baseId);
    var genres = await _mediator.Send(query);

    return Results.Ok(genres);
  }

  [HttpGet]
  public async Task<IResult> GetAsync([FromQuery] GetGenresRequest request)
  {
    var command = _mapper.Map<GetGenresQuery>(request);
    var genres = await _mediator.Send(command);

    return Results.Ok(genres);
  }

  [HttpPost]
  [RequiredRoles(UserRole.Admin)]
  public async Task<IResult> CreateAsync(GenreModelRequest request)
  {
    var command = _mapper.Map<CreateGenreCommand>(request);
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }

  [HttpGet("{id}")]
  public async Task<IResult> GetByIdAsync(int id)
  {
    var query = new GetGenreByIdQuery(id);
    var result = await _mediator.Send(query);

    return Results.Ok(result);
  }

  [HttpPut("{id}")]
  [RequiredRoles(UserRole.Admin)]
  public async Task<IResult> UpdateAsync(int id, GenreModelRequest request)
  {
    var command = _mapper.Map<UpdateGenreCommand>(request) with { Id = id };
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }

  [HttpDelete("{id}")]
  [RequiredRoles(UserRole.Admin)]
  public async Task<IResult> DeleteAsync(int id)
  {
    var command = new DeleteGenreCommand(id);
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }
}