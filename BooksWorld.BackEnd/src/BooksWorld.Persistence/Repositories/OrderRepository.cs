using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Domain.Models;
using BooksWorld.Persistence.DataProviders;
using BooksWorld.Persistence.Repositories.Common;

namespace BooksWorld.Persistence.Repositories;

public class OrderRepository(ApplicationDbContext context)
  : StandartRepository<Order>(context), IOrderRepository
{
}