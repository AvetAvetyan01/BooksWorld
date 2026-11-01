using BooksWorld.Persistence.DataProviders;
using BooksWorld.Persistence.Repositories.Common;
using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Domain.Models;

namespace BooksWorld.Persistence.Repositories;

public class ReviewRepository(ApplicationDbContext context)
  : StandartRepository<Review>(context), IReviewRepository;