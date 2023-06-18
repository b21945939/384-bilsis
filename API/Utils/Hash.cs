using System.Security.Cryptography;
using Data;
using Models;
using Crypt = BCrypt.Net.BCrypt;

namespace API;

public class Hash
{
    public static string HashPassword(string password)
    {
        return Crypt.HashPassword(password, Crypt.GenerateSalt(12));
    }

    public static bool VerifyPassword(string givenPassword, string hashed)
    {
        return Crypt.Verify(givenPassword, hashed);
    }
}