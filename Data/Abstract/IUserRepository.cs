using Models;
using Npgsql;

namespace Data;

public interface IUserRepository
{
    public Task<User> GetUser(int id);
    public Task<User> SetUser(int id, string email, string password, UserType type);

    public Task<User> CreateUser(int id, string email, string firstName, string lastName,
        UserType studentType);

    public Task<User> GetUserFromEmail(string email);
    public Task<User> ChangeInfo(int id, string address, string phone);
    public Task<User> ChangePassword(int id, string password);
    public Task<List<User>> GetAllUsers();
    public Task<User> BanUser(int id);
    public Task<User> UnbanUser(int id);
    public Task<User> DeleteUser(int id);
    public Task<List<User>> GetUsersByType(UserType type);
    public Task<List<User>> GetBannedUsers();
    public Task<List<StudentWithEnroll>> GetAllStudentsByCourseId(int id);
    public Task<List<Instructor>> GetAllInstructorsByDepartmentId(int id);
}