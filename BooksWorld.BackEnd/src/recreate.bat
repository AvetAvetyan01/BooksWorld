dotnet ef database drop --project BooksWorld.Persistence --startup-project BooksWorld.API -f
dotnet ef migrations remove --project BooksWorld.Persistence --startup-project BooksWorld.API
dotnet ef migrations add Initial --project BooksWorld.Persistence --startup-project BooksWorld.API
dotnet ef database update --project BooksWorld.Persistence --startup-project BooksWorld.API

