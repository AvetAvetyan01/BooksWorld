using FluentValidation;

namespace BooksWorld.Application.Commands.AdminCommands.AnswerFeedback;

public class AnswerFeedbackRequestValidator : AbstractValidator<AnswerFeedbackRequest>
{
    public AnswerFeedbackRequestValidator()
    {
        // ... 
    }
}