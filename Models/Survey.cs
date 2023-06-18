using Npgsql;

namespace Models;

public class Survey
{
    public int Id { get; set; }
    public Question[] Questions { get; set; }
    public int CourseId { get; set; }
    public int InstructorId { get; set; }
    
    public Survey()
    {
    }
    public Survey(int id, Question[] questions, int courseId, int instructorId)
    {
        Id = id;
        Questions = questions;
        CourseId = courseId;
        InstructorId = instructorId;
    }
    
    public Survey(NpgsqlDataReader reader)
    {
        reader.Read();
        Id = reader.GetInt32(0);
        CourseId = reader.GetInt32(1);
        InstructorId = reader.GetInt32(2);
    }
}