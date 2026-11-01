using BooksWorld.Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace BooksWorld.API.Extensions;

public class RequiredRoles : AuthorizeAttribute
{
  public RequiredRoles(params UserRole[] roles)
  {
    Roles = string.Join(',', roles);
  }
}