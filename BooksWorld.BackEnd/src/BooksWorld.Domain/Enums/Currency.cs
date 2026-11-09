using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace BooksWorld.Domain.Enums;

[JsonConverter(typeof(StringEnumConverter))]
public enum Currency
{
    AMD = 1, 
    USD = 2,
    RUB = 3
}