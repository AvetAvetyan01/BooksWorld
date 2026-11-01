using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BooksWorld.API.ModelBinders;

public class BooksIdArrayBinder : IModelBinder
{
  public Task BindModelAsync(ModelBindingContext bindingContext)
  {
    var value = bindingContext.HttpContext.Request.QueryString.ToString()
      .Replace("?", "")
      .Replace("%20", "") // for spaces between numbers
      .Replace(" ", "");

    if (string.IsNullOrEmpty(value))
    {
      bindingContext.Result = ModelBindingResult.Success(Array.Empty<int>());
      return Task.CompletedTask;
    }

    try
    {
      var values = value.Split(',')
        .Select(v => int.Parse(v))
        .Distinct()
        .ToArray();

      bindingContext.Result = ModelBindingResult.Success(values);
    }
    catch
    {
      bindingContext.ModelState.TryAddModelError(bindingContext.ModelName, "Invalid ID list");
    }

    return Task.CompletedTask;
  }
}