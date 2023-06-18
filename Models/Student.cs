using Npgsql;

namespace Models;

public class Student : User
{
    public int StudentNumber { get; set; }
    public int InstructorId { get; set; }
    public bool IsGraduate { get; set; }
    public Student()
    {
    }
    public Student(int id, string hashedPassword, string firstName, string surname, string email, string phone,
        string address, bool isBanned , int studentNumber, int instructorId, bool isGraduate) : base(id, hashedPassword, firstName, surname, email, phone, UserType.Student, address, isBanned)
    {
        Id = id;
        HashedPassword = "********";
        FirstName = firstName;
        Surname = surname;
        Email = email;
        Phone = phone;
        UserType = UserType.Student;
        Address = address;
        IsBanned = isBanned;
        StudentNumber = studentNumber;
        InstructorId = instructorId;
        IsGraduate = isGraduate;
    }

    public Student(NpgsqlDataReader reader) : base(reader)
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
        StudentNumber = reader.GetInt32(9);
        InstructorId = reader.GetInt32(10);
        IsGraduate = reader.GetBoolean(11);
    }
}