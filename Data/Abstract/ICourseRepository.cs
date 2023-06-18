using Models;

namespace Data;

public interface ICourseRepository
{
    public Task<TranscriptWithCourses> GetTranscript(int id);
    public Task<Course> CreateCourse(Course course);
    public Task<Course> GetCourse(int id);
    public Task<List<Course>> GetCoursesOfInstructor(int id);
    public Task<List<Course>> UpdateCoursesOfInstructorByCourseIdList(int id, List<int> courseIds);
    public  Task<List<Course>> UpdateCoursesOfStudent(int id, List<int> courseIds);
    public  Task<List<Course>> GetCoursesOfStudent(int id);
    public Task<List<Course>> GetAllAvailableCourses(int id);
    public Task<List<Student>> GetStudentsOfCourse(int id);
    public Task<List<Course>> GetCoursesOfDepartment(int id);
    public Task<Transcript> UpdateTranscriptFromStudent(int id);
    public Task<Course> ApproveCourse(int id,List<int> studentIds);
    public Task<List<Course>> GetAllCoursesOfInstructor(int id);
    public Task<List<Course>> GetAllAvailableCoursesOfDepartment(int id);

}