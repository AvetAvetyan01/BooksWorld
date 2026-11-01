using MediatR;

namespace BooksWorld.Application.Commands.CheckoutCommands.CheckoutSessionWebhook;

public record CheckoutSessionWebhookCommand 
(
  Stream  RequestBody,
  string? SignatureHeader
) 
: IRequest<bool>;