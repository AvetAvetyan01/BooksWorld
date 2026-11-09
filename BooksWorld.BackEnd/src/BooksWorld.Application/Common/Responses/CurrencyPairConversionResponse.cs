namespace BooksWorld.Application.Common.Responses;

public class CurrencyPairConversionResponse
{
  public required string   Result                  { get; set; }
  public required string   Documentation           { get; set; }
  public required string   Terms_of_use            { get; set; }
  public required double   Time_last_update_unix   { get; set; }
  public required string   Time_last_update_utc    { get; set; }
  public required double   Time_next_update_unix   { get; set; }
  public required string   Time_next_update_utc    { get; set; }
  public required string   Base_code               { get; set; }
  public required string   Target_code             { get; set; }
  public required double   Conversion_rate         { get; set; }
  public double?           Conversion_result       { get; set; }
}