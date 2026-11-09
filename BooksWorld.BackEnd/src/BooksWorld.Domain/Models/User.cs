using BooksWorld.Domain.Models.BookModels.SubbooksDetailsModels;
using BooksWorld.Domain.Enums;

namespace BooksWorld.Domain.Models;

public class User
{
  // public string     SupabaseId    { get; set; } = string.Empty;
  public Guid       Id            { get; set; } = Guid.NewGuid();
  public string     Name          { get; set; } = string.Empty;
  public string     Email         { get; set; } = string.Empty;
  public string     Phone         { get; set; } = string.Empty; 
  public string     PasswordHash  { get; set; } = string.Empty;
  public UserRole   Role          { get; set; }

  public ICollection<BoughtSubbook> BoughtSubbooks  { get; set; } = [];
  public ICollection<LikedBook>     LikedBooks      { get; set; } = [];
  public ICollection<CartBook>      CartBooks       { get; set; } = [];

  // 1. probably we need to save likedBooks data in usersTable as 'likeds' field as 
  //    converted string seperated by ', ' symbol
  // 3. add Address?, PostalCode?, AvatarImg?, ICollection<Notification> fields
}