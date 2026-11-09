namespace BooksWorld.Application.Commands.OrderCommands.Common;

public sealed record OrderModelRequest
(
  Guid UserId,
  string? ShippingAddress,
  string? Description  
);
