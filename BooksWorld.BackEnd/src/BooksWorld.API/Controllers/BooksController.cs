using BooksWorld.Application.Queries.BookQueries.GetSuggestions;
using BooksWorld.Application.Commands.BookCommands.Common;
using BooksWorld.Application.Commands.BookCommands.Create;
using BooksWorld.Application.Commands.BookCommands.Delete;
using BooksWorld.Application.Commands.BookCommands.Update;
using BooksWorld.Application.Queries.BookQueries.GetById;
using BooksWorld.Application.Queries.BookQueries.GetByIds;
using BooksWorld.Application.Queries.BookQueries.Get;
using BooksWorld.API.ModelBinders;
using Microsoft.AspNetCore.Mvc;
using BooksWorld.API.Extensions;
using BooksWorld.Domain.Enums;
using MapsterMapper;
using MediatR;

namespace BooksWorld.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController
  (IMediator mediator, IMapper mapper) : ControllerBase
{
  public readonly IMapper _mapper = mapper;
  public readonly IMediator _mediator = mediator;

  [HttpGet("suggestions/")]
  public async Task<IResult> GetSuggestionsAsync([FromQuery] GetBooksSuggestionsRequest request)
  { 
    var query = _mapper.Map<GetBooksSuggestionsQuery>(request);
    var books = await _mediator.Send(query);

    return Results.Ok(books);
  } 

  [HttpGet("list/")]
  public async Task<IResult> GetBooksByIds([ModelBinder<BooksIdArrayBinder>] int[] bookIds)
  {
    var query = new GetBooksByIdsQuery(bookIds);
    var books = await _mediator.Send(query);

    return Results.Ok(books);
  }

  [HttpGet]
  public async Task<IResult> GetBooksAsync([FromQuery] GetBooksRequest request)
  {
    var query = _mapper.Map<GetBooksQuery>(request);
    var books = await _mediator.Send(query);

    return Results.Ok(books);
  }

  [HttpPost]
  [RequiredRoles(UserRole.Admin)]
  public async Task<IResult> CreateAsync([FromForm] BookModelRequest request)
  {
    var command = _mapper.Map<CreateBookCommand>(request);  
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }

  [HttpGet("{id}")]
  public async Task<IResult> GetByIdAsync(int id)
  {
    var query = new GetBookByIdQuery(id);
    var book = await _mediator.Send(query);

    return Results.Ok(book);
  }

  [HttpPut("{id}")]
  [RequiredRoles(UserRole.Admin)]
  public async Task<IResult> UpdateAsync(int id, [FromForm] BookModelRequest request)
  {
    var command = _mapper.Map<UpdateBookCommand>(request) with { Id = id };
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }

  [HttpDelete("{id}")]
  [RequiredRoles(UserRole.Admin)]
  public async Task<IResult> DeleteAsync(int id)
  {
    var command = new DeleteBookCommand(id);
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }
}
