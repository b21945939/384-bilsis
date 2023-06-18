using Npgsql;

namespace Models;

public class Course
{
    
    public int Id { get; set; }
    public string CourseCode { get; set; }
    public string CourseName { get; set; }
    public int Credit { get; set; }
    public string Class { get; set; }
    public int Quota { get; set; }
    public int DepartmentId { get; set; }
    public int InstructorId { get; set; }

    public Course()
    {
        
    }
    public Course(int id, string courseCode, string courseName, int credit, string @class, int quota, int departmentId, int ınstructorId)
    {
        Id = id;
        CourseCode = courseCode;
        CourseName = courseName;
        Credit = credit;
        Class = @class;
        Quota = quota;
        DepartmentId = departmentId;
        InstructorId = ınstructorId;
    }

    public Course(NpgsqlDataReader reader)
    {
        reader.Read();
        Id = reader.GetInt32(0);
        CourseCode = reader.GetString(1);
        CourseName = reader.GetString(2);
        Credit = reader.GetInt32(3);
        Class = reader.GetString(4);
        Quota = reader.GetInt32(5);
        DepartmentId = reader.GetInt32(6);
        InstructorId = reader.GetInt32(7);
    }
    
}