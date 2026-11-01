using Microsoft.AspNetCore.Http;
using BooksWorld.Domain.Enums;
using MediatR;

namespace BooksWorld.Application.Commands.SubbookCommands.Update;

public record UpdateSubbookCommand
(
  int           Id,
  int           BookId,
  int           Year,
  Language      Language,
  BookFormat    Format,
  int           Price,
  string        Publisher,
  IFormFile?    File,
  IFormFile?    IntroductionFile,
  object        Details
) : IRequest<int>;