namespace Data;

public interface IUtilsRepository
{
    public Task SetResetToken(int id,int token);
    public Task<bool> DeleteResetToken(int token,string password);
}