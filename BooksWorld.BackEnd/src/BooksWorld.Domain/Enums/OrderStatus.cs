using System.Runtime.Serialization;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace BooksWorld.Domain.Enums;

// [JsonConverter(typeof(JsonStringEnumConverter))]
[JsonConverter(typeof(StringEnumConverter))]
public enum OrderStatus
{
  Pending = 1,
  [EnumMember(Value = "Payment Awaiting")] PaymentAwaiting = 2,
  Processing = 3,
  Completed = 4,
}