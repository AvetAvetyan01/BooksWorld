using MediatR;

namespace BooksWorld.Application.Commands.CheckoutCommands.CreateSession;

public record CreateCheckoutSessionCommand(Guid UserId) : IRequest<string>;
