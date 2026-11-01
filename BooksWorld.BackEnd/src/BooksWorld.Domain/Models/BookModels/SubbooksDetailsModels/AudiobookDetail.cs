namespace BooksWorld.Domain.Models.BookModels.SubbooksDetailsModels;

public class AudiobookDetail
{
  public TimeOnly Duration    { get; set; }
  public string   Reader      { get; set; } = string.Empty;
}