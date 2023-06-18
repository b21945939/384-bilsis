using Models;
using Npgsql;

namespace Data;

public static class Querrier
{

    public static async Task<int> Counter(string query, string connString)
    {
        var conn = new NpgsqlConnection(connString);
        if(conn.State == System.Data.ConnectionState.Open) await conn.CloseAsync();
        await conn.OpenAsync();
        var cmdStart = new NpgsqlCommand(query, conn);
        var readerStart = await cmdStart.ExecuteReaderAsync();
        if(!readerStart.HasRows)
        {
            await conn.CloseAsync();
            return 0;
        }
        await readerStart.ReadAsync();
        var count = readerStart.GetInt32(0);
        await conn.CloseAsync();
        return count;
    }
    
    public static async Task<T> BasicQuery<T>(string query, string connString) where T : new()
    {
        var conn = new NpgsqlConnection(connString);
        if(conn.State == System.Data.ConnectionState.Open) await conn.CloseAsync();
        await conn.OpenAsync();
        var cmd = new NpgsqlCommand(query, conn);
        var reader = await cmd.ExecuteReaderAsync();
        if (!reader.HasRows)
        {
            await conn.CloseAsync();
            return default(T);
        }

        var value = new T();
        var constructor = typeof(T).GetConstructor(new[] { typeof(NpgsqlDataReader) });
        if (constructor != null)
        {
            value = (T)constructor.Invoke(new object[] { reader });
        }
        else if (typeof(T) == typeof(int))
        {
            await reader.ReadAsync();
            value = (T)Convert.ChangeType(reader.GetInt32(0), typeof(T));
        }
        else if (typeof(T) == typeof(double))
        {
            await reader.ReadAsync();
            value = (T)Convert.ChangeType(reader.GetDouble(0), typeof(T));
        }
        else if (typeof(T) == typeof(float))
        {
            await reader.ReadAsync();
            value = (T)Convert.ChangeType(reader.GetFloat(0), typeof(T));
        }
        else if (typeof(T) == typeof(bool))
        {
            await reader.ReadAsync();
            value = (T)Convert.ChangeType(reader.GetBoolean(0), typeof(T));
        }
        else if (typeof(T) == typeof(string))
        {
            await reader.ReadAsync();
            value = (T)Convert.ChangeType(reader.GetString(0), typeof(T));
        }
        await conn.CloseAsync();
        return value;
    }
    
    public static async Task<List<T>> ListQuery<T>(string query,string countQuery, string connString) where T : new()
    {
        var conn = new NpgsqlConnection(connString);
        if(conn.State == System.Data.ConnectionState.Open) await conn.CloseAsync();
        var count = await Counter(countQuery,connString);
        await conn.OpenAsync();
        var cmd = new NpgsqlCommand(query, conn);
        var reader = await cmd.ExecuteReaderAsync();
        if (!reader.HasRows)
        {
            await conn.CloseAsync();
            return null;
        }
        var values = new List<T>();
        for (int i = 0; i < count; i++)
        {
            var value = new T();
            var constructor = typeof(T).GetConstructor(new[] { typeof(NpgsqlDataReader) });
            if (constructor != null)
            {
                value = (T)constructor.Invoke(new object[] { reader });
            }
            else if (typeof(T) == typeof(int))
            {
                await reader.ReadAsync();
                value = (T)Convert.ChangeType(reader.GetInt32(0), typeof(T));
            }
            else if (typeof(T) == typeof(double))
            {
                await reader.ReadAsync();
                value = (T)Convert.ChangeType(reader.GetDouble(0), typeof(T));
            }
            else if (typeof(T) == typeof(float))
            {
                await reader.ReadAsync();
                value = (T)Convert.ChangeType(reader.GetFloat(0), typeof(T));
            }
            else if (typeof(T) == typeof(bool))
            {
                await reader.ReadAsync();
                value = (T)Convert.ChangeType(reader.GetBoolean(0), typeof(T));
            }
            else if (typeof(T) == typeof(string))
            {
                await reader.ReadAsync();
                value = (T)Convert.ChangeType(reader.GetString(0), typeof(T));
            }
            values.Add(value);
        }
        await conn.CloseAsync();
        return values;
    }
}