using ErrorOr;

namespace BooksWorld.Domain.Errors;

public static partial class Errors
{
    public static class Book
    {
        public static Error EmptyModel => Error.Conflict(
                code: "Errors.Book",
                description: "Model is empty"
            );
    }
}
