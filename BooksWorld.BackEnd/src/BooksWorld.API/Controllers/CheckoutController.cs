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

  // [HttpPost("products")]
  // public IResult CreateProduct()
  // {
  //   // var imageBytes = System.IO.File.ReadAllBytes(@"../../../BooksWorld.UI/public/images/books/11.jpg");  
  //   // var imageBytes = System.IO.File.ReadAllBytes("../../BooksWorld.UI/public/images/books/11.jpg");  
  //   // var imageBytes = System.IO.File.ReadAllBytes("../../BooksWorld/BooksWorld.UI/public/images/books/11.jpg");  
  //   var imageBytes = System.IO.File.ReadAllBytes("https://wswdfyhwpkjxkccojqld.supabase.co/storage/v1/object/public/BW-public/images/books/A%20Connecticut%20Yankee%20in%20King%20Arthur's%20Court.jpg");  
  //   var imageBytes_base64 = Convert.ToBase64String(imageBytes);

  //   var options = new ProductCreateOptions
  //   {
  //     Active = true,
  //     DefaultPriceData = new ()
  //     {
  //       Currency = "AMD",
  //       UnitAmount = 400000, // last 2 numbers is luma
  //       // UnitAmountDecimal = 5500.00m,
  //     },
  //     // Images = ["images/books/11.jpg"],
  //     // Images = ["https://www.dropbox.com/scl/fi/eo2ky49v57ap9qe5vwjm3/7.jpg?rlkey=5hgzo0iwk9qtgly903j2hnl9i&st=c2za8j1x&dl=0"],
  //     // Images = ["https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093"],
  //     // Images = [imageBytes_base64],
  //     Name = "Example Book 88",
  //     Description = "TEST 2",
  //     // Type = "subbook",
  //     Metadata = []
  //   };

  //   var creationResult = _client.V1.Products.Create(options);

  //   return Results.Ok(creationResult);
  // }

  // for real webhooks we need to go stripe.com/developers/webhooks section
  // for reciving webhook in sandbox we must to use this command in terminal, and 
  // don't interupt him, for asking Stripe send the webhook to our backend
  // stripe listen --forward-to http://localhost:5500/api/checkout/webhook 
  //    --events checkout.session.completed,checkout.session.async_payment_succeeded
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