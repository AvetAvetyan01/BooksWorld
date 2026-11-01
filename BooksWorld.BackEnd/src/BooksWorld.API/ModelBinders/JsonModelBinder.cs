using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json;

namespace BooksWorld.API.ModelBinders;

public class JsonModelBinder<T> : IModelBinder
{
  public Task BindModelAsync(ModelBindingContext bindingContext)
  {
    var value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName).FirstValue;

    if (string.IsNullOrEmpty(value))
    {
      bindingContext.Result = ModelBindingResult.Success(default(T));
      return Task.CompletedTask;  
    }

    var result = JsonSerializer.Deserialize<T>(value,
      new JsonSerializerOptions
      {
        PropertyNameCaseInsensitive = true
      });

    bindingContext.Result = ModelBindingResult.Success(result);
    return Task.CompletedTask;
  }
}