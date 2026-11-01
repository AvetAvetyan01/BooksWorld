using BooksWorld.Domain.Collections;
using BooksWorld.Domain.Interfaces.Repositories;
using BooksWorld.Domain.Models.BookModels;
using MediatR;

namespace BooksWorld.Application.Queries.BookQueries.Get;

public class GetBooksQueryHandler(IBookRepository bookRepository)
  : IRequestHandler<GetBooksQuery, PagedCollection<Book>>
{
  private readonly IBookRepository _bookRepository = bookRepository;

  public async Task<PagedCollection<Book>> Handle
    (GetBooksQuery query, CancellationToken cancellationToken)
  {
    var books = await _bookRepository.GetFilteredAsync(query.Filter);
    var orderedBooks = await _bookRepository.GetOrderedAsync(books, query.SortBy, query.ByAscending);
    var pagedBooks = PagedCollection<Book>.Parse(orderedBooks, query.Page, query.Size);

    return pagedBooks;
  }
}