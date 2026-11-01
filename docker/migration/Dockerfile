FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ./BooksWorld.BackEnd .

RUN dotnet tool install --version 8.0.4 --global dotnet-ef

ENV PATH=${PATH}:/root/.dotnet/tools

RUN mkdir -p /app

RUN dotnet ef migrations bundle \
  --project ./src/BooksWorld.Persistence \
  --startup-project ./src/BooksWorld.API \
  --self-contained \
  --target-runtime linux-musl-x64 \
  --output /app/bundle \
  --verbose

FROM mcr.microsoft.com/dotnet/runtime-deps:8.0-alpine AS migration-runner

WORKDIR /app

COPY --from=build /app/bundle .

RUN chmod +x ./bundle

ENTRYPOINT [ "./bundle" ]