using MediatR;

namespace BooksWorld.Application.Commands.AdminCommands.AnswerFeedback;

public class AnswerFeedbackCommandHandler : IRequestHandler<AnswerFeedbackCommand>
{
    public Task Handle(AnswerFeedbackCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}