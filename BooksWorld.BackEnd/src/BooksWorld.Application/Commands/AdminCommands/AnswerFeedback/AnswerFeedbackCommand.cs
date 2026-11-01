using MediatR;

namespace BooksWorld.Application.Commands.AdminCommands.AnswerFeedback;

public sealed record AnswerFeedbackCommand
() : IRequest;