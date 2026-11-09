using System.Text.Json.Serialization;

namespace BooksWorld.Domain.Enums.SearchTypes;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum AuthorsSearchField
{
  Id,
  FullName
}