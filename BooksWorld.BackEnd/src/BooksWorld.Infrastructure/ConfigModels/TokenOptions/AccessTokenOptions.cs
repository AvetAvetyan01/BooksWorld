namespace BooksWorld.Infrastructure.ConfigModels.TokenOptions;

public class AccessTokenOptions
{
  public string SecretKey       { get; set; } = string.Empty;
  public int    ExpiresMinutes  { get; set; }
}