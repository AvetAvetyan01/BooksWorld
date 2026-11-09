using Microsoft.AspNetCore.Mvc;
using BooksWorld.Domain.Interfaces.Generics;

namespace BooksWorld.API.Controllers.Common;

// We need to do api versioning
[ApiController]
[Route("api/[controller]")]
public abstract class StandartController<T, TModelRequest>
  (IService<T, TModelRequest> service) : ControllerBase
  where T : IEntity
{
  private readonly IService<T, TModelRequest> _service = service;

  // probably we need to transfer all code to controllers 

  // if we add common method for pagination result (witch includes sorting,filtering...)
  // our method need to have request witch is release IPaginationRequest interface
  // or another one like that, wich have `page, size, sortingType,filter parameters...

  [HttpPost]
  public virtual async Task<IResult> Create(TModelRequest request)
  {
    await _service.CreateAsync(request);  

    return Results.Created();
  }

  [HttpGet("{id}")]
  public virtual async Task<IResult> Get(int id)
  {
    var entity = await _service.GetByIdAsync(id);

    if (entity is null)
      return Results.NotFound();

    return Results.Ok(entity);
  }

  [HttpPut("{id}")]
  public virtual async Task<IResult> Update(int id, TModelRequest request)
  {
    await _service.UpdateAsync(id, request);

    return Results.Ok();
  }

  [HttpDelete("{id}")]
  public virtual async Task<IResult> Delete(int id)
  {
    await _service.DeleteAsync(id);

    return Results.NoContent();
  }
}