using BooksWorld.Application.Commands.UserCommands.Common;
using BooksWorld.Persistence.DataProviders;
using Microsoft.EntityFrameworkCore;
using BooksWorld.Domain.Models;
using BooksWorld.Domain.Enums;
using MediatR;

namespace BooksWorld.Application.Commands.CartCommands.Create;

public class CreateCartBookCommandHandler
  (ApplicationDbContext dbContext) 
  : IRequestHandler<CreateCartBookCommand, CartBookDTO> 
{
  private readonly ApplicationDbContext _dbContext = dbContext;

  public async Task<CartBookDTO> Handle
    (CreateCartBookCommand command, CancellationToken cancellationToken)
  {
    var subbook = await _dbContext.Subbooks.FirstOrDefaultAsync(s => s.Id == command.SubbookId, cancellationToken)
      ?? throw new Exception($"Subbook not found (${command.SubbookId})");

    var book = await _dbContext.Books.FirstOrDefaultAsync(s => s.Id == subbook.BookId, cancellationToken)
      ?? throw new Exception($"Book not found (${subbook.BookId})");

    var isInCart = _dbContext.CartBooks.Any(cb => cb.UserId == command.UserId && cb.SubbookId == subbook.Id);

    if (isInCart) throw new Exception($"Subbook included in cart (Subbook Id: {command.SubbookId})");

    var isBought = _dbContext.BuyedSubbooks.Any
      (bs => bs.UserId == command.UserId && bs.SubbookId == command.SubbookId);    

    if (isBought) throw new Exception($"User Try To Add In Cart Bought Subbook (Subbook Id: {command.SubbookId})");

    var cartBook = new CartBook
    {
      UserId = command.UserId,
      SubbookId = command.SubbookId,
      BookId = subbook.BookId,
      StripeCouponId = subbook.StripeCouponId,
      StripePriceId = subbook.StripePriceId,
      BookFormat = subbook.Format,  
      Quantity = subbook.Format == BookFormat.Paper ? 1 : null,
      DiscountPercent = book.DiscountPercent,
      BookImgUrl = book.ImageUrl,
      BookTitle_AM = book.Title_AM,
      BookTitle_EN = book.Title_EN,
      BookTitle_RU = book.Title_RU,
      // BookTitle = book.Title,
      Subbook = subbook,
    };

    var creatingResult = await _dbContext.CartBooks.AddAsync(cartBook, cancellationToken);

    await _dbContext.SaveChangesAsync(cancellationToken);

    // return creatingResult.Entity;
    var cbDTO = new CartBookDTO(cartBook.Id, cartBook.BookId, cartBook.SubbookId, cartBook.Quantity);

    return cbDTO;
  }
}