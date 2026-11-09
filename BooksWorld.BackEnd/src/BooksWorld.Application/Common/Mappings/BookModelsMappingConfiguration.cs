using BooksWorld.Application.Queries.BookQueries.Get;
using Mapster;

namespace BooksWorld.Application.Common.Mappings;

public class BookModelsMappingConfiguration : IRegister
{
  public void Register(TypeAdapterConfig config)
  {
    config.NewConfig<GetBooksRequest, GetBooksQuery>()
      .Map(dst => dst.Filter, src => src);
  }
}
