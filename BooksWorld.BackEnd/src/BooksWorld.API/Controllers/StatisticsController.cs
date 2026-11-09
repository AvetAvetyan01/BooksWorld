using BooksWorld.Application.Queries.StatisticsQueries.GetBookGrades;
using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace BooksWorld.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatisticsController
  (IMediator mediator) : ControllerBase
{
  private readonly IMediator _mediator = mediator;

  [HttpGet("/api/books/{bookId}/grades")]
  public async Task<IResult> GetBookRating(int bookId)
  {
    var query = new GetBookGradesQuery(bookId);
    var rating = await _mediator.Send(query);

    return Results.Ok(rating);
  }
}