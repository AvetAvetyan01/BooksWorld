using BooksWorld.Domain.Common;
using System.Text.Json;
using Mapster;

namespace BooksWorld.Application.Common.Mappings;

public class GlobalMappingConfiguration : IRegister
{
  public void Register(TypeAdapterConfig config)
  {
    // config.NewConfig<string, Translations>()
    //   .MapWith(src => JsonSerializer.Deserialize<Translations>(src, new JsonSerializerOptions())!);

    config.NewConfig<string, object>()
      .MapWith(src => JsonSerializer.Deserialize<object>(src, new JsonSerializerOptions())!);
  }
} 