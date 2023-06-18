using System.ComponentModel;
using Npgsql;

namespace Models;

public enum UserType
{
    [Description("Admin")]
    Admin = 1,
    [Description("Instructor")]
    Instructor,
    [Description("Student")]
    Student,
    [Description("DepartmentManager")]
    DepartmentManager
}

public class User
{
    public int Id { get; set; }
    public string HashedPassword { get; set; }
    public string FirstName { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public UserType UserType { get; set; }
    public string Address { get; set; }
    public bool IsBanned { get; set; }
    
    public User()
    {
    }

    public User(int id, string hashedPassword, string firstName, string surname, string email, string phone,
        UserType userType, string address, bool isBanned = false)
    {
        Id = id;
        HashedPassword = hashedPassword;
        FirstName = firstName;
        Surname = surname;
        Email = email;
        Phone = phone;
        UserType = userType;
        Address = address;
        IsBanned = isBanned;
    }

    public User(NpgsqlDataReader reader)
    {
        reader.Read();
        Id = reader.GetInt32(0);
        FirstName = reader.GetString(1);
        Surname = reader.GetString(2);
        Email = reader.GetString(3);
        HashedPassword = reader.GetString(4);
        Phone = reader.GetString(5);
        UserType = (UserType)reader.GetInt32(6);
        Address = reader.GetString(7);
        IsBanned = reader.GetBoolean(8);
    }
}