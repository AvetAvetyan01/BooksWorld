using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Domain.Models.BookModels;
using BooksWorld.Persistence.DataProviders;
using BooksWorld.Persistence.Repositories.Common;

namespace BooksWorld.Persistence.Repositories;

public class SubbookRepository(ApplicationDbContext context) 
  : StandartRepository<Subbook>(context), ISubbookRepository;