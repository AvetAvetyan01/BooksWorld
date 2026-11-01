namespace BooksWorld.Infrastructure.ConfigModels.TokenOptions;

public class RefreshTokenOptions
{
  public string SecretKey     { get; set; } = string.Empty;
  public int    ExpiresHours  { get; set; }
}