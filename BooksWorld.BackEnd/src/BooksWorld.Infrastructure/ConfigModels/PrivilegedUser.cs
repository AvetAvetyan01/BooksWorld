namespace BooksWorld.Infrastructure.ConfigModels;

// it can be admin, manager and other no-user roles witch have permissions
public record PrivilegedUser
(
    string Name,
    string Email,
    string Password
);