using System.Security.Claims;
using Data;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API;

[Route("course")]
[ApiController]
public class CourseController : ControllerBase
{
    private IUserRepository _userRepository;
    private ICourseRepository _courseRepository;

    public CourseController(IUserRepository userRepository, ICourseRepository courseRepository)
    {
        _userRepository = userRepository;
        _courseRepository = courseRepository;
    }
    
    public class ApproveDto
    {
        public int CourseId { get; set; }
        public List<int> StudentIds { get; set; }
    }

    public class CourseCreationDto
    {
        public int Id { get; set; }
        public string CourseCode { get; set; }
        public string CourseName { get; set; }
        public int Credit { get; set; }
        public string Class { get; set; }
        public int Quota { get; set; }
        public int DepartmentId { get; set; }
        public int InstructorId { get; set; }
    }

    [HttpGet("transcript/{id:int}")]
    public async Task<IActionResult> GetTranscript(int id)
    {
        var user = await _userRepository.GetUser(id);
        if (user.Equals(null)) return NotFound();
        var transcript = await _courseRepository.GetTranscript(id);
        return Ok(transcript);
    }
    [HttpGet("transcript")]
    public async Task<IActionResult> GetTranscript()
    {
        if (!await Utils.CookieController(HttpContext.User, _userRepository)) return BadRequest();
        var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.SerialNumber)?.Value);
        var user = await _userRepository.GetUser(id);
        if (user.Equals(null)) return NotFound();
        var transcript = await _courseRepository.GetTranscript(id);
        return Ok(transcript);
    }
    [HttpPost("create")]
    public async Task<IActionResult> CreateCourse([FromBody] CourseCreationDto courseCreationDto)
    {
        var course = new Course(courseCreationDto.Id, courseCreationDto.CourseCode, courseCreationDto.CourseName,
            courseCreationDto.Credit, courseCreationDto.Class, courseCreationDto.Quota, courseCreationDto.DepartmentId,
            courseCreationDto.InstructorId);
        var newCourse = await _courseRepository.CreateCourse(course);
        return Ok(newCourse);
    }

    [HttpGet("courses/{courseId:int}")]
    public async Task<IActionResult> GetCourse(int courseId)
    {
        var course = await _courseRepository.GetCourse(courseId);
        return Ok(course);
    }

    [HttpGet("instructorcourse")]
    public async Task<IActionResult> GetCoursesOfInstructor()
    {
        if (!await Utils.CookieController(HttpContext.User, _userRepository)) return BadRequest();
        var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.SerialNumber)?.Value);
        var courses = await _courseRepository.GetCoursesOfInstructor(id);
        return Ok(courses);
    }

    [HttpPatch("instructor/{instructorId:int}/add")]
    public async Task<List<Course>> UpdateCoursesOfInstructorByCourseIdList(int instructorId,
        [FromBody] List<int> courseIds)
    {
        var courses = await _courseRepository.UpdateCoursesOfInstructorByCourseIdList(instructorId, courseIds);
        return courses;
    }

    [HttpPatch("student/{studentId:int}/add")]
    public async Task<List<Course>> UpdateCoursesOfStudent(int studentId, [FromBody] List<int> courseIds)
    {
        var courses = await _courseRepository.UpdateCoursesOfStudent(studentId, courseIds);
        return courses;
    }

    [HttpGet("student/{studentId:int}")]
    public async Task<List<Course>> GetCoursesOfStudent(int studentId)
    {
        var courses = await _courseRepository.GetCoursesOfStudent(studentId);
        return courses;
    }

    [HttpGet("available")]
    public async Task<IActionResult> GetAvailableCoursesOfStudent()
    {
        if (!await Utils.CookieController(HttpContext.User, _userRepository)) return BadRequest();
        var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.SerialNumber)?.Value);
        var courses = await _courseRepository.GetAllAvailableCourses(id);
        return Ok(courses);
    }

    [HttpGet("students/{courseId:int}")]
    public async Task<List<StudentWithEnroll>> GetStudentsOfCourse(int courseId)
    {
        var students = await _userRepository.GetAllStudentsByCourseId(courseId);
        return students;
    }
    
    [HttpPatch("transcript")]
    public async Task<IActionResult> UpdateTranscriptFromStudent()
    {
        if (!await Utils.CookieController(HttpContext.User, _userRepository)) return BadRequest();
        var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.SerialNumber)?.Value);
        var transcript = await _courseRepository.UpdateTranscriptFromStudent(id);
        return Ok(transcript);
    }
    
    [HttpPatch("transcript/{studentId:int}")]
    public async Task<IActionResult> UpdateTranscript(int studentId)
    {
        var user = await _userRepository.GetUser(studentId);
        if (user is null) return BadRequest("User is not found!");
        var transcript = await _courseRepository.UpdateTranscriptFromStudent(studentId);
        return Ok(transcript);
    }
    
    [HttpPatch("approve")]
    public async Task<IActionResult> ApproveCourse([FromBody] ApproveDto approve)
    {
        var courses = await _courseRepository.ApproveCourse(approve.CourseId,approve.StudentIds);
        return Ok(courses);
    }
    
    [HttpGet("department")]
    public async Task<IActionResult> GetCoursesOfDepartment()
    {
        if (!await Utils.CookieController(HttpContext.User, _userRepository)) return BadRequest();
        var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.SerialNumber)?.Value);
        var courses = await _courseRepository.GetCoursesOfDepartment(id);
        return Ok(courses);
    }
    
    [HttpGet("instructor/all/{instructorId:int}")]
    
    public async Task<IActionResult> GetAllCoursesOfInstructor(int instructorId)
    {
        var courses = await _courseRepository.GetAllCoursesOfInstructor(instructorId);
        return Ok(courses);
    }
    
    [HttpGet("instructor/available")]
    public async Task<IActionResult> GetAvailableCoursesOfDepartment()
    {
        if (!await Utils.CookieController(HttpContext.User, _userRepository)) return BadRequest();
        var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.SerialNumber)?.Value);
        var courses = await _courseRepository.GetAllAvailableCoursesOfDepartment(id);
        return Ok(courses);
    }
    
}