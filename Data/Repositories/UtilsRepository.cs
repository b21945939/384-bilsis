using Models;
using Npgsql;

namespace Data;

public class UtilsRepository : IUtilsRepository
{
    private string _conn;

    public UtilsRepository(string conn)
    {
        _conn = conn;
    }
    
    public async Task SetResetToken(int id, int token)
    {
        var insert = await Querrier.BasicQuery<int>(
            $"INSERT INTO resettoken (id, token) VALUES ({id}, {token})",
            _conn);
    }

    public async Task<bool> DeleteResetToken(int token,string hashedPassword)
    {
        var changed = await Querrier.BasicQuery<int>(
            $"UPDATE \"user\" SET \"Password\"='{hashedPassword}' WHERE id=(SELECT id FROM resettoken WHERE token={token})",
            _conn);
        await Querrier.BasicQuery<int>(
            $"DELETE FROM resettoken WHERE token={token}",
            _conn);
        return true;
    }
}