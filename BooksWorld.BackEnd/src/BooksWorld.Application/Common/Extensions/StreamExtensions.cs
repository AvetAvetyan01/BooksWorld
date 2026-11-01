using Microsoft.AspNetCore.Http;

namespace BooksWorld.Application.Common.Extensions;

public static class StreamExtensions
{
  public static async Task<byte[]> GetFileBytes(this IFormFile file, CancellationToken cancellationToken = default)
  {
    using var memoryStream = new MemoryStream();

    await file.CopyToAsync(memoryStream, cancellationToken);

    var fileBytes = memoryStream.ToArray();

    return fileBytes;
  }
}