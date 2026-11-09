FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# probably we need to remove that
WORKDIR /src

COPY . .

RUN dotnet publish -c Release -o /src/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

COPY --from=build /src/publish .

RUN mkdir -p UploadData
COPY --from=build /src/src/BooksWorld.Domain/DataGenerators/UploadData/ ./UploadData

ENTRYPOINT ["dotnet", "BooksWorld.API.dll"]