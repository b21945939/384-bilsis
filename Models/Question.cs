using Npgsql;

namespace Models;

public class Question
{
    public int Id { get; set; }
    public string Sentence { get; set; }
    public string[] Options { get; set; }

    public Question()
    {
        
    }
    public Question(int id, string sentence, string[] options)
    {
        Id = id;
        Sentence = sentence;
        Options = options;
    }

    public Question(NpgsqlDataReader reader)
    {
        reader.Read();
        Id = reader.GetInt32(0);
        Sentence = reader.GetString(1);
        try
        {
            Options = reader.GetString(2).Split(";");
        }
        catch (Exception e)
        {
            Options = null;
        }
    }
}