using BooksWorld.Application.Common.Requests.Pagination;
using BooksWorld.Application.Queries.AuthorQueries.GetPaged;
using Mapster;

namespace BooksWorld.Application.Mappings;

public class PagedRequestsMappingsConfiguration : IRegister
{
  public void Register(TypeAdapterConfig config)
  {
    config.NewConfig<PaginationRequest, GetPagedAuthorsQuery>()
      .Map(dst => dst.Page, src => src.Page)
      .Map(dst => dst.Size, src => (int)src.Size);
  }
}