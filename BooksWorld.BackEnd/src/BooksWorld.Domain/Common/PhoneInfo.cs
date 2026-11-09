namespace BooksWorld.Domain.Common;

public struct PhoneInfo(int countryCode,int length)
{
    public readonly int CountryCode => countryCode;
    public readonly int Length => length;
};