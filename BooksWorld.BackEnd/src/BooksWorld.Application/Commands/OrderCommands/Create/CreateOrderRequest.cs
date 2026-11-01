namespace BooksWorld.Application.Commands.OrderCommands.Create;

public sealed record CreateOrderRequest
(
    string? ShippingAddress,
    string? Description
);
