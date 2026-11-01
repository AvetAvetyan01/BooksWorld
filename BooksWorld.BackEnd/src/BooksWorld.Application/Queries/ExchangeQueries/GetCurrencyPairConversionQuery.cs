using BooksWorld.Application.Common.Responses;
using BooksWorld.Domain.Enums;
using MediatR;

namespace BooksWorld.Application.Queries.ExchangeQueries;

public record GetCurrencyPairConversionQuery(Currency Currency) : IRequest<CurrencyPairConversionResponse>;