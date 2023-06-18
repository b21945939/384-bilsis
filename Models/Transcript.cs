using Npgsql;

namespace Models;

public class Transcript
{
    public int Id { get; set; }
    public int TotalCredit { get; set; }
    public double TotalGrade { get; set; }
    public Transcript()
    {
    }
    public Transcript(int id, int totalCredit, double totalGrade)
    {
        Id = id;
        TotalCredit = totalCredit;
        TotalGrade = totalGrade;
    }
    
    public Transcript(NpgsqlDataReader reader)
    {
        reader.Read();
        Id = reader.GetInt32(0);
        TotalCredit = reader.GetInt32(1);
        TotalGrade = reader.GetDouble(2);
    }
}