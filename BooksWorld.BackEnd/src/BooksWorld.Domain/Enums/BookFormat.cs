using System.Text.Json.Serialization;

namespace BooksWorld.Domain.Enums;

[Flags]
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum BookFormat
{
  Paper = 1,
  Electronic = 2,
  Audio = 4,
}