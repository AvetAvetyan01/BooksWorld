using System.Text.Json.Serialization;

namespace BooksWorld.Domain.Enums
{
  [JsonConverter(typeof(JsonStringEnumConverter))]
  public enum SortingType
  {
    Rating,
    Newest
  }
}