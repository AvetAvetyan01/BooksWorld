using BooksWorld.Application.Queries.ReviewQueries.GetUserReview;
using BooksWorld.Application.Queries.BookQueries.GetBookReviews;
using BooksWorld.Application.Commands.ReviewCommands.Common;
using BooksWorld.Application.Commands.ReviewCommands.Create;
using BooksWorld.Application.Commands.ReviewCommands.Delete;
using BooksWorld.Application.Commands.ReviewCommands.Update;
using BooksWorld.Application.Queries.ReviewQueries.GetPaged;
using BooksWorld.Application.Queries.ReviewQueries.GetById;
using BooksWorld.Application.Common.Requests.Pagination;
using Microsoft.AspNetCore.Mvc;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using BooksWorld.Infrastructure.Authentication;

namespace BooksWorld.API.Controllers;

[ApiController]     
[Route("api/[controller]")]
public class ReviewsController
  (IMediator mediator, IMapper mapper) : ControllerBase
{
  private readonly IMapper _mapper = mapper;
  private readonly IMediator _mediator = mediator;

  [Authorize]
  [HttpGet("/api/books/{bookId}/reviews/my")]
  public async Task<IResult> GetUserReview(int bookId)
  {
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User Id Not Found");

    var query = new GetUserReviewQuery(UserId: Guid.Parse(userId), BookId: bookId);
    var review = await _mediator.Send(query);

    return Results.Ok(review);
  } 
  
  [HttpGet("/api/books/{bookId}/reviews/{page}/{size}")]
  public async Task<IResult> GetBookPagedReviewsAsync(int bookId, int page, int size)
  {
    var query = new GetBookPagedReviewsQuery(BookId: bookId, Page: page, Size: size);
    var reviews = await _mediator.Send(query);

    return Results.Ok(reviews);
  }
  
  [HttpGet]
  public async Task<IResult> GetPagedAsync([FromQuery] PaginationRequest request)
  {
    var query = _mapper.Map<GetPagedReviewsQuery>(request);
    var reviews = await _mediator.Send(query);

    return Results.Ok(reviews);
  } 

  [HttpPost]
  [Authorize]
  public async Task<IResult> CreateAsync(ReviewModelRequest request)
  {
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User Id Not Found");

    var command = _mapper.Map<CreateReviewCommand>(request) with { UserId = Guid.Parse(userId) };
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }

  [HttpGet("{id}")]
  public async Task<IResult> GetByIdAsync(int id)
  {
    var query = new GetReviewByIdQuery(id);
    var review = await _mediator.Send(query);

    return Results.Ok(review);
  }

  [Authorize]
  [HttpPut("{id}")]
  public async Task<IResult> UpdateAsync(int id, ReviewModelRequest request)
  {
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User Id Not Found");

    var command = _mapper.Map<UpdateReviewCommand>(request) with { Id = id, UserId = Guid.Parse(userId) };
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }

  [Authorize]
  [HttpDelete("{id}")]
  public async Task<IResult> DeleteAsync(int id)
  {
    var userId = User.FindFirstValue(CustomClaims.UserId) ?? throw new Exception("User Id Not Found");

    var command = new DeleteReviewCommand(id, Guid.Parse(userId));
    var result = await _mediator.Send(command);

    return Results.Ok(result);
  }
}