namespace BooksWorld.Infrastructure.ConfigModels;

public class PrivilegedUsers 
{
    // When we want to add new roll just add 
    // array from that type in this class
    // (Probably in future we add Managers also)

    public PrivilegedUser[] Admins { get; set; } = [];
}