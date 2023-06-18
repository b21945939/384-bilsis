using Npgsql;

namespace Models;

public class Instructor : User
{
    public int DepartmentId { get; set; }
    public int HeadedBy { get; set; }
    public Instructor(){}
    public Instructor(int id, string hashedPassword, string firstName, string surname, string email, string phone,
        string address, bool isBanned , int departmentId, int headedBy) : base(id, hashedPassword, firstName, surname, email, phone, UserType.Instructor, address, isBanned)
    {
        Id = id;
        HashedPassword = "********";
        FirstName = firstName;
        Surname = surname;
        Email = email;
        Phone = phone;
        UserType = UserType.Instructor;
        Address = address;
        IsBanned = isBanned;
        DepartmentId = departmentId;
        HeadedBy = headedBy;
    }

    public Instructor(NpgsqlDataReader reader) : base(reader)
    {
        Id = reader.GetInt32(0);
        FirstName = reader.GetString(1);
        Surname = reader.GetString(2);
        Email = reader.GetString(3);
        var password = reader.GetString(4);
        if(password == "") HashedPassword = "";
        else HashedPassword = "********";
        Phone = reader.GetString(5);
        UserType = (UserType)reader.GetInt32(6);
        Address = reader.GetString(7);
        IsBanned = reader.GetBoolean(8);
        DepartmentId = reader.GetInt32(9);
        HeadedBy = reader.GetInt32(10);
    }
}