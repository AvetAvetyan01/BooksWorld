using MediatR;

namespace BooksWorld.Application.Commands.OrderCommands.Create;

public sealed record CreateOrderCommand
(
    Guid UserId,
    string? ShippingAddress,
    string? Description
) : IRequest<string>;
