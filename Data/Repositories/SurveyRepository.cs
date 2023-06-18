using Models;
using Npgsql;

namespace Data;

public class SurveyQuestion{}

public class SurveyCreator
{
    public int Id { get; set; }
    public int[] Questions { get; set; }
    public int CourseId { get; set; }
    public int InstructorId { get; set; }
}
public class SurveyRepository : ISurveyRepository
{
    private string _conn;

    public SurveyRepository(string conn)
    {
        _conn = conn;
    }
    
    
    public async Task<Survey> CreateSurvey(SurveyCreator survey)
    {
        var query = "INSERT INTO question (id, sentence, options) VALUES ";
        var surveyQuestionAdder = "INSERT INTO surveyquestion (surveyid, questionid) VALUES ";
        var maxIdSurvey = await Querrier.BasicQuery<int>($"SELECT MAX(id) FROM survey", _conn)+1;
        // for(int i = 0; i < survey.Questions.Length; i++)
        // {
        //     var question = survey.Questions[i];
        //     surveyQuestionAdder += $"('{maxIdSurvey}', '{++maxIdQuestion}'), ";
        //     query+= $"('{maxIdQuestion}', '{question.Sentence}', '{string.Join(";", question.Options)}'), ";
        // }
        query = query.Remove(query.Length - 2);
        query += " RETURNING *"; 
        var questions = await Querrier.ListQuery<Question>(query, $"SELECT "+survey.Questions.Length, _conn);
        var returner = await Querrier.BasicQuery<Survey>($"INSERT INTO survey (id, courseID, instructorid) VALUES ('{maxIdSurvey}', '{survey.CourseId}', '{survey.InstructorId}') RETURNING *", _conn);
        var surveyquestions = await Querrier.ListQuery<SurveyQuestion>(surveyQuestionAdder, $"SELECT COUNT(*) FROM surveyquestion", _conn);
        
        return returner;
    }

    public async Task<Question> CreateQuestion(Question question)
    {
        var maxId = await Querrier.BasicQuery<int>($"SELECT MAX(id) FROM question", _conn);
        if(maxId == 0) maxId = 1;
        var returner = await Querrier.BasicQuery<Question>($"INSERT INTO question (id, sentence, options) VALUES ('{maxId+1}', '{question.Sentence}', '{string.Join(";", question.Options)}') RETURNING *", _conn);
        return returner;
    }

    public async Task<List<Question>> GetSurveyQuestions(int id)
    {
        var returner = await Querrier.ListQuery<Question>($"SELECT * FROM question WHERE id IN (SELECT questionid FROM surveyquestion WHERE surveyid='{id}')", $"SELECT COUNT(*) FROM question WHERE id IN (SELECT questionid FROM surveyquestion WHERE surveyid='{id}')", _conn);
        return returner;
    }

    public async Task<List<Question>> GetAllQuestions()
    {
        var questionList = await Querrier.ListQuery<Question>("SELECT * FROM question", $"SELECT COUNT(*) FROM question", _conn);
        return questionList;
    }
}