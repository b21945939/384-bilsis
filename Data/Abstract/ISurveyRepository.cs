using Models;

namespace Data;

public interface ISurveyRepository
{
    public Task<Survey> CreateSurvey(SurveyCreator survey);
    public Task<Question> CreateQuestion(Question question);
    public Task<List<Question>> GetSurveyQuestions(int id);
    public Task<List<Question>> GetAllQuestions();
    
}