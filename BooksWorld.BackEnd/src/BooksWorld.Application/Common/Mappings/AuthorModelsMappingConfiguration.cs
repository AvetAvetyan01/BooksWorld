using BooksWorld.Application.Queries.AuthorQueries.Get;
using Mapster;

namespace BooksWorld.Application.Common.Mappings;

public class AuthorModelsMappingConfiguration : IRegister
{
  public void Register(TypeAdapterConfig config)
  {
    config.NewConfig<GetAuthorsRequest, GetAuthorsQuery>()
      .Map(dst => dst.Filter, src => src);
  }
}