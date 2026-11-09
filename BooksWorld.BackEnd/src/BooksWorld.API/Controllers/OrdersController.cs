using BooksWorld.Application.Queries.OrderQueries.GetSuggestions;
using BooksWorld.Application.Commands.OrderCommands.Common;
using BooksWorld.Application.Commands.OrderCommands.Create;
using BooksWorld.Application.Queries.OrderQueries.GetById;
using BooksWorld.Application.Queries.OrderQueries.Get;
using BooksWorld.Infrastructure.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MapsterMapper;
using MediatR;

namespace BooksWorld.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController
  (IMediator mediator, IMapper mapper) : ControllerBase
{
  private readonly IMapper _mapper = mapper;
  private readonly IMediator _mediator = mediator;

  [HttpGet("suggestions/")]
  public async Task<IActionResult> GetSuggestionsAsync([FromQuery] GetOrdersSuggestionsRequest request)
  {
    var query = _mapper.Map<GetOrdersSuggestionsQuery>(request);
    var suggestions = await _mediator.Send(query);

    return Ok(suggestions);
  }

  [HttpGet]
  public async Task<IActionResult> GetPagedAsync([FromQuery]GetOrdersRequest request)
  {
    var command = _mapper.Map<GetOrdersQuery>(request);
    var orders = await _mediator.Send(command);

    return Ok(orders);
  }

  [HttpPost]
  public async Task<IActionResult> CreateAsync(OrderModelRequest request)
  {
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User Id Not Found");

    var command = _mapper.Map<CreateOrderCommand>(request) with { UserId = Guid.Parse(userId) };
    var secret = await _mediator.Send(command);

    return Ok(secret);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetByIdAsync(int id)
  {
    var query = new GetOrderByIdQuery(id);
    var order = await _mediator.Send(query);

    return Ok(order);
  }
}