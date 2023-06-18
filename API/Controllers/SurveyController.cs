using System.Security.Claims;
using Data;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API;

[Route("survey")]
[ApiController]
public class SurveyController : ControllerBase
{
    private ISurveyRepository _surveyRepository;
    private IUserRepository _userRepository;
    private IUtilsRepository _utilsRepository;

    public SurveyController(ISurveyRepository surveyRepository, IUserRepository userRepository, IUtilsRepository utilsRepository)
    {
        _surveyRepository = surveyRepository;
        _userRepository = userRepository;
        _utilsRepository = utilsRepository;
    }
    [HttpGet("survey/{id}")]
    public async Task<IActionResult> GetSurveyQuestions(int id)
    {
        var questions = await _surveyRepository.GetSurveyQuestions(id);
        if (questions is null)
        {
            return NotFound();
        }
        return Ok(questions);
    }

    [HttpPost("survey")]
    public async Task<IActionResult> CreateSurvey([FromBody] SurveyCreator survey)
    {
        if (survey is null)
        {
            return BadRequest();
        }
        if (!await Utils.CookieController(HttpContext.User, _userRepository)) return BadRequest();
        var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.SerialNumber)?.Value);
        survey.InstructorId = id;
        var createdSurvey = await _surveyRepository.CreateSurvey(survey);
        if (createdSurvey is null)
        {
            return BadRequest();
        }
        
        return Created("survey", createdSurvey);
    }
    
    [HttpPost("question")]
    public async Task<IActionResult> CreateQuestion([FromBody] Question question)
    {
        if (question is null)
        {
            return BadRequest();
        }
        var createdQuestion = await _surveyRepository.CreateQuestion(question);
        if (createdQuestion is null)
        {
            return BadRequest();
        }
        return Created("question", createdQuestion);
    }
    
    [HttpGet("allquestion")]
    public async Task<IActionResult> GetAllQuestions()
    {
        var question = await _surveyRepository.GetAllQuestions();
        return Ok(question);
    }
}