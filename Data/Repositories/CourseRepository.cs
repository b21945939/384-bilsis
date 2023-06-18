using Microsoft.VisualBasic.CompilerServices;
using Npgsql;
using Models;

namespace Data;

public class CoursesWithGrade
{
    public string CourseCode { get; set; }
    public string CourseName { get; set; }
    public int Credit { get; set; }
    public double Grade { get; set; }
}
public class TranscriptWithCourses
{
    public Transcript Transcript { get; set; }
    public List<CoursesWithGrade> Courses { get; set; }
    public TranscriptWithCourses()
    {
    }
    public TranscriptWithCourses(Transcript transcript, List<CoursesWithGrade> courses)
    {
        Transcript = transcript;
        Courses = courses;
    }
}

public class CourseStudent{
}
public class CourseGrade
{
    public int CourseId { get; set; }
    public double Grade { get; set; }
    public CourseGrade()
    {
    }
    public CourseGrade(int courseId, double grade)
    {
        CourseId = courseId;
        Grade = grade;
    }
}
public class CourseRepository: ICourseRepository
{
    private string _conn;

    public CourseRepository(string conn)
    {
        _conn = conn;

    }

    public async  Task<TranscriptWithCourses> GetTranscript(int id)
    {
        var transcript = await Querrier.BasicQuery<Transcript>($"SELECT * FROM transcript WHERE id='{id}'", _conn);
        var courses = await Querrier.ListQuery<Course>($"SELECT * FROM course WHERE id IN (SELECT courseid FROM coursestudent WHERE studentid='{id}')", $"SELECT COUNT(*) FROM course WHERE id IN (SELECT courseid FROM coursestudent WHERE studentid='{id}')", _conn);
        var courseGrades = await Querrier.ListQuery<CourseGrade>($"SELECT courseid,grade FROM coursestudent WHERE studentid='{id}'", $"SELECT COUNT(*) FROM coursestudent WHERE studentid='{id}'", _conn);
        var dic = new List<CoursesWithGrade>();
        if(transcript is null || courses is null || courseGrades is null) return null;
        for(var i = 0; i < courses.Count; i++)
        {
            var cwg = new CoursesWithGrade();
            cwg.CourseCode = courses[i].CourseCode;
            cwg.CourseName = courses[i].CourseName;
            cwg.Credit = courses[i].Credit;
            cwg.Grade = courseGrades[i].Grade;
            dic.Add(cwg);
        }
        return new TranscriptWithCourses(transcript, dic);
    }

    public async Task<Course> CreateCourse(Course course)
    {
        var newCourse = await Querrier.BasicQuery<Course>($"INSERT INTO course (coursecode, coursename, credit, class, quota, departmentid, InstructorID) VALUES ('{course.CourseCode}', '{course.CourseName}', {course.Credit}, '{course.Class}', {course.Quota}, {course.DepartmentId}, {course.InstructorId}) RETURNING *", _conn);
        return newCourse;
    }
    public async Task<Course> GetCourse(int id)
    {
        var course = await Querrier.BasicQuery<Course>($"SELECT * FROM course WHERE id='{id}'", _conn);
        return course;
    }

    public async Task<List<Course>> GetCoursesOfInstructor(int id)
    {
        var courses = await Querrier.ListQuery<Course>($"SELECT * FROM course WHERE InstructorID={id}", $"SELECT COUNT(*) FROM course WHERE InstructorID={id}", _conn);
        return courses;
    }

    public async Task<List<Course>> UpdateCoursesOfInstructorByCourseIdList(int id, List<int> courseIds)
    {
        var courses = await Querrier.ListQuery<Course>($"UPDATE course SET InstructorID={id} WHERE id IN ({string.Join(',', courseIds)}) RETURNING *", $"SELECT COUNT(*) FROM course WHERE id IN ({string.Join(',', courseIds)})", _conn);
        return courses;
    }
    public async Task<List<Course>> UpdateCoursesOfStudent(int id, List<int> courseIds)
    {
        var courses = await Querrier.ListQuery<Course>($"UPDATE course SET quota = quota - 1 WHERE id IN ({string.Join(',', courseIds)}) AND quota > 0 RETURNING *", $"SELECT COUNT(*) FROM course WHERE id IN ({string.Join(',', courseIds)})", _conn);
        var courseStudentAdd = await Querrier.ListQuery<CourseStudent>($"INSERT INTO coursestudent (studentid, courseid) SELECT {id}, courseid FROM unnest(ARRAY[{string.Join(", ", courseIds)}]) AS courseid WHERE NOT EXISTS (SELECT 1 FROM coursestudent WHERE studentid={id} AND courseid IN ({string.Join(", ", courseIds)})) RETURNING *", $"SELECT "+courseIds.Count, _conn);
        return courses;
    }

    public async Task<List<Course>> GetCoursesOfStudent(int id)
    {
        var courses = await Querrier.ListQuery<Course>($"SELECT * FROM course WHERE id IN (SELECT courseid FROM coursestudent WHERE studentid={id})", $"SELECT COUNT(*) FROM course WHERE id IN (SELECT courseid FROM coursestudent WHERE studentid={id})", _conn);
        return courses;
    }

    public async Task<List<Course>> GetAllAvailableCourses(int id)
    {
        var courses = await Querrier.ListQuery<Course>($"SELECT * FROM course WHERE quota > 0 AND id NOT IN (SELECT courseid FROM coursestudent WHERE studentid={id})", $"SELECT COUNT(*) FROM course WHERE id NOT IN (SELECT courseid FROM coursestudent WHERE studentid={id})", _conn);
        return courses;
    }

    public async Task<List<Student>> GetStudentsOfCourse(int id)
    {
        var students = await Querrier.ListQuery<Student>($"SELECT * FROM student WHERE id IN (SELECT studentid FROM coursestudent WHERE courseid={id})", $"SELECT COUNT(*) FROM student WHERE id IN (SELECT studentid FROM coursestudent WHERE courseid={id})", _conn);
        return students;
    }

    public async Task<List<Course>> GetCoursesOfDepartment(int id)
    {
        var courses = await Querrier.ListQuery<Course>($"SELECT * FROM course WHERE departmentid={id}", $"SELECT COUNT(*) FROM course WHERE departmentid={id}", _conn);
        return courses;
    }
    public async Task<Transcript> UpdateTranscriptFromStudent(int id)
    {
        var totalCredit = await Querrier.BasicQuery<int>($"SELECT SUM(credit) FROM course WHERE id IN (SELECT courseid FROM coursestudent WHERE studentid={id})", _conn);
        var totalGrade = await Querrier.BasicQuery<double>($"SELECT SUM(grade) FROM coursestudent WHERE studentid={id}", _conn);
        var transcript = new Transcript(id, totalCredit, totalGrade);
        var hasTranscript = await Querrier.BasicQuery<bool>($"SELECT EXISTS(SELECT 1 FROM transcript WHERE id={id})", _conn);
        if (hasTranscript)
        {
            transcript = await Querrier.BasicQuery<Transcript>($"UPDATE transcript SET totalcredit={totalCredit}, totalgrade={totalGrade} WHERE id={id} RETURNING *", _conn);
        }
        else
        {
            transcript = await Querrier.BasicQuery<Transcript>($"INSERT INTO transcript (id, totalcredit, totalgrade) VALUES ({id}, {totalCredit}, {totalGrade}) RETURNING *", _conn);
        }

        return transcript;
    }

    public async Task<Course> ApproveCourse(int id, List<int> studentIds)
    {
        var course = await Querrier.BasicQuery<Course>($"UPDATE course SET quota = quota - {studentIds.Count} WHERE id={id} AND quota > {studentIds.Count} RETURNING *", _conn);
        var coursestudentUpdate = await Querrier.ListQuery<CourseStudent>($"UPDATE coursestudent SET isenrolled = true WHERE courseid={id} AND studentid IN ({string.Join(", ", studentIds)})", $"SELECT COUNT(*) FROM coursestudent WHERE courseid={id} AND studentid IN ({string.Join(", ", studentIds)})", _conn);
        return course;
    }

    public async Task<List<Course>> GetAllCoursesOfInstructor(int id)
    {
        var courses = await Querrier.ListQuery<Course>($"SELECT * FROM course WHERE InstructorID={id}", $"SELECT COUNT(*) FROM course WHERE InstructorID={id}", _conn);
        return courses;
    }

    public async Task<List<Course>> GetAllAvailableCoursesOfDepartment(int id)
    {
        var courses = await Querrier.ListQuery<Course>($"SELECT * FROM course WHERE instructorid IS NULL AND departmentid={id}", $"SELECT * FROM course WHERE instructorid IS NULL AND departmentid={id}", _conn);
        return courses;
    }
}