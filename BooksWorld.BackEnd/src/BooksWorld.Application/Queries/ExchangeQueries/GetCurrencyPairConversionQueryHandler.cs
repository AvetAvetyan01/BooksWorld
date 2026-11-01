using BooksWorld.Application.Common.Responses;
using Microsoft.Extensions.Configuration;
using BooksWorld.Domain.Enums;
using MediatR;

namespace BooksWorld.Application.Queries.ExchangeQueries;

public class GetCurrencyPairConversionQueryHandler 
  (IConfiguration configuration)
  : IRequestHandler<GetCurrencyPairConversionQuery, CurrencyPairConversionResponse>
{
  private readonly IConfiguration _configuration = configuration;

  public async Task<CurrencyPairConversionResponse> Handle
    (GetCurrencyPairConversionQuery query, CancellationToken cancellationToken)
  {    
    // using var httpClient = new HttpClient(); 

    // var currencyResponse = await httpClient.GetAsync(
    //   $"https://v6.exchangerate-api.com/v6/{_configuration["ExchangeRate:ApiKey"]}/pair/AMD/{query.Currency}", cancellationToken);

    // var result = await currencyResponse.Content.ReadFromJsonAsync<CurrencyPairConversionResponse>(cancellationToken)
    //   ?? throw new Exception("Currencies list not given");

    Dictionary<Currency, double> currencies = new ()
    {
      [Currency.AMD] = 1,
      [Currency.USD] = 0.00262,
      [Currency.RUB] = 0.2011,
    };

    var fakeConversion = new CurrencyPairConversionResponse
    {
      Result = "",
      Base_code = "",
      Target_code = "",
      Terms_of_use = "",
      Documentation = "",
      Time_last_update_unix = 0,
      Time_next_update_unix = 0,
      Time_last_update_utc = "",
      Time_next_update_utc = "",
      Conversion_rate = currencies[query.Currency] 
    };

    return fakeConversion;
  }
}