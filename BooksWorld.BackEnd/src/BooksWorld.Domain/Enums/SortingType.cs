using System.Text.Json.Serialization;

namespace BooksWorld.Domain.Enums
{
  [JsonConverter(typeof(JsonStringEnumConverter))]
  public enum SortingType
  {
    Id,
    Rating,
    Newest
  }
}