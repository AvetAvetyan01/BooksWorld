using System.Text.Json.Serialization;

namespace BooksWorld.Domain.Enums
{
  [Flags]
  [JsonConverter(typeof(JsonStringEnumConverter))]
  public enum Language
  {
    Armenian = 1,
    Frence = 2,
    English = 4,
    Russian = 8,
    German = 32,
    Italian = 64
  }
}