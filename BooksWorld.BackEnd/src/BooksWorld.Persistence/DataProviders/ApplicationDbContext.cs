using BooksWorld.Domain.Models.BookModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using BooksWorld.Domain.Models;
using BooksWorld.Domain.Models.BookModels.SubbooksDetailsModels;

namespace BooksWorld.Persistence.DataProviders;

// Երբ մենք օգտագործում ենք IConfiguration կոնստրուկտորի մեջ որպեսզի ունենանք
// հասանելիություն appsettings.json֊ին, համակարգը չի կարողանում հասկանա թե որ 
// appsettings.json-ը օգտագործի
// Օգտագործում ենք միգրացիաի եվ թարմացման հրամանների հետ հետեվյալ опция֊ները 
// հրամանները կատարելով գլխավոր կատալոգում (BooksWorld (առանց կետ ու ինչ որ բանի))
// 1. --project опция-ով նշումենք թե որ պրոեկտումա գտնվում տվյալների բազայի կոնտեքստը
// (մեր մոտ դա գտնվումա BookWorld.Persistence) 
// 2. --startup-project опция-ով նշումենք թե որ կարճ ասած են պրոեկտը որտեղից ուզումենք
// վերցնենք իրա appsettings.json-ը (որը կներկայանի իրենից API, MVC կամ ուրիշ բան)

// dotnet ef database drop --project BooksWorld.Persistence --startup-project BooksWorld.API
// - remove migrations, add migration Initial, database update

public class ApplicationDbContext(IOptions<DbOptions> dbOptions) : DbContext
{
  private readonly DbOptions _dbOptions = dbOptions.Value;

  public required DbSet<Book>         Books         { get; set; }
  public required DbSet<Subbook>      Subbooks      { get; set; }
  public required DbSet<CartBook>     CartBooks     { get; set; }
  public required DbSet<LikedBook>    LikedBooks    { get; set; }
  public required DbSet<Genre>        Genres        { get; set; }
  public required DbSet<Author>       Authors       { get; set; }
  public required DbSet<Order>        Orders        { get; set; }
  public required DbSet<OrderItem>    OrderItems    { get; set; }
  public required DbSet<Review>       Reviews       { get; set; }
  public required DbSet<User>         Users         { get; set; }
  
  public required DbSet<BoughtSubbook>    BuyedSubbooks       { get; set; }
  public required DbSet<UserRefreshToken> UsersRefreshTokens  { get; set; }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    optionsBuilder.UseNpgsql(_dbOptions.DefaultConnection);
    // optionsBuilder.UseInMemoryDatabase(_dbOptions.DefaultConnection);
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
  }
}