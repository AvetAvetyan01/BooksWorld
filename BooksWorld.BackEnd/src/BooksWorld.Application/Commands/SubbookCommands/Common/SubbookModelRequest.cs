using Microsoft.AspNetCore.Http;
using BooksWorld.Domain.Enums;
using MediatR;

namespace BooksWorld.Application.Commands.SubbookCommands.Common;

public record SubbookModelRequest
(
  int         BookId,
  int         Year,
  Language    Language,
  BookFormat  Format,
  int         Price,
  string      Publisher, 
  IFormFile?  File,
  IFormFile?  IntroductionFile,
  string      Details
);