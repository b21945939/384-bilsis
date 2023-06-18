using Npgsql;
using Models;

namespace Data;

public class StudentWithEnroll
{
    public int StudentId { get; set; }
    public int StudentNumber { get; set; }
    public string FirstName { get; set; }
    public string SurName { get; set; }
    public bool IsEnrolled { get; set; }
    public StudentWithEnroll(int studentId, int studentNumber, string firstName,string surName, bool isEnrolled)
    {
        StudentNumber = studentNumber;
        StudentId = studentId;
        FirstName = firstName;
        SurName = surName;
        IsEnrolled = isEnrolled;
    }
}
public class UserRepository : IUserRepository
    {
        private string _conn;

        public UserRepository(string conn)
        {
            _conn = conn;
        }
        public async Task<List<User>> GetAllUsers()
        {
            var returner = await Querrier.ListQuery<User>($"SELECT * FROM \"user\"", $"SELECT COUNT(*) FROM \"user\"", _conn);
            return returner;
        }

        public async Task<User> BanUser(int id)
        {
            var returner = await Querrier.BasicQuery<User>($"UPDATE \"user\" SET isBanned=true WHERE ID='{id}' RETURNING *", _conn);
            if (returner.Equals(null)) return null;
            var user2 = await Querrier.BasicQuery<User>($"SELECT * FROM \"user\" WHERE ID='{id}'", _conn);
            if (!user2.Equals(null)) return null;
            var user = await Querrier.BasicQuery<User>($"INSERT INTO banlist (id) VALUES ('{id}') RETURNING *", _conn);
            return user;
        }

        public async Task<User> UnbanUser(int id)
        {
            var returner = await Querrier.BasicQuery<User>($"UPDATE \"user\" SET isBanned=false WHERE ID='{id}' RETURNING *", _conn);
            if (returner.Equals(null)) return null;
            var user2 = await Querrier.BasicQuery<User>($"SELECT * FROM \"user\" WHERE ID='{id}'", _conn);
            if (!user2.Equals(null)) return null;
            var user = await Querrier.BasicQuery<User>($"DELETE FROM banlist WHERE id='{id}' RETURNING *", _conn);
            return user;
        }

        public async Task<User> DeleteUser(int id)
        {
            var returner = await Querrier.BasicQuery<User>($"SELECT * FROM \"user\" WHERE ID='{id}'", _conn);
            if (returner.Equals(null)) return null;
            var user = await Querrier.BasicQuery<User>($"DELETE FROM \"user\" WHERE ID='{id}' RETURNING *", _conn);
            return user;
        }

        public async Task<List<User>> GetUsersByType(UserType type)
        {
            var users = await Querrier.ListQuery<User>(
                $"SELECT * FROM \"user\" WHERE USERTYPE='{(int)type}'",
                $"SELECT COUNT(*) FROM \"user\" WHERE USERTYPE='{(int)type}'", _conn);
            return users;
        }

        public async Task<List<User>> GetBannedUsers()
        {
            var users = await Querrier.ListQuery<User>($"SELECT * FROM \"user\" WHERE isBanned=true",
                $"SELECT COUNT(*) FROM banlist", _conn);
            return users;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await Querrier.BasicQuery<User>($"SELECT * FROM \"user\" WHERE ID='{id}'", _conn);
            return user;
        }

        public async Task<User> GetUserFromEmail(string email)
        {
            var user = await Querrier.BasicQuery<User>(
                $"SELECT * FROM \"user\" WHERE EMAIL='{email}'",
                _conn);
            return user;
        }

        public async Task<User> CreateUser(int id, string email, string firstName, string lastName,
            UserType userType)
        {
            var user = await Querrier.BasicQuery<User>(
                $"INSERT INTO \"user\"(id, email,firstname,surname,usertype,\"Password\",phone,address) VALUES ('{id}', '{email}', '{firstName}', '{lastName}','{(int)userType}','','','') RETURNING *",
                _conn);
            return user;
        }

        public async Task<User> SetUser(int id, string email, string hashedPassword, UserType userType)
        {
            var user = await Querrier.BasicQuery<User>(
                $"UPDATE \"user\" SET email = '{email}' , \"Password\" = '{hashedPassword}' , usertype = '{(int)userType}' WHERE id = '{id}' RETURNING *",
                _conn);
            return user;
        }

        public async Task<User> ChangeInfo(int id, string address, string phone)
        {
            var user = await Querrier.BasicQuery<User>(
                $"UPDATE \"user\" SET address = '{address}' , phone = '{phone}' WHERE id = '{id}' RETURNING *",
                _conn);
            return user;
        }

        public async Task<User> ChangePassword(int id, string password)
        {
            var user = await Querrier.BasicQuery<User>(
                $"UPDATE \"user\" SET \"Password\" = '{password}' WHERE id = '{id}' RETURNING *",
                _conn);
            return user;
        }

        public async Task<List<StudentWithEnroll>> GetAllStudentsByCourseId(int id)
        {
            var students = await Querrier.ListQuery<Student>(
                $"SELECT u.*, s.studentnumber, s.instructorid, s.isgraduate FROM \"user\" u JOIN student s ON u.id = s.id WHERE u.id IN (SELECT studentid FROM coursestudent WHERE courseid = '{id}')",
                $"SELECT COUNT(*) FROM \"user\" u JOIN student s ON u.id = s.id WHERE u.id IN (SELECT studentid FROM coursestudent WHERE courseid = '{id}')", _conn);
            var enrolledList = await Querrier.ListQuery<bool>(
                $"SELECT isenrolled FROM coursestudent WHERE courseid = '{id}'",
                $"SELECT COUNT(*) FROM coursestudent WHERE courseid = '{id}'", _conn);
            var studentWithEnroll = new List<StudentWithEnroll>();
            for(int i = 0; i < students.Count; i++)
            {
                studentWithEnroll.Add(new StudentWithEnroll(students[i].Id,students[i].StudentNumber,students[i].FirstName,students[i].Surname, enrolledList[i]));
            }
            return studentWithEnroll;
        }

        public Task<List<Instructor>> GetAllInstructorsByDepartmentId(int id)
        {
            var instructors = Querrier.ListQuery<Instructor>(
                $"SELECT u.*, i.id, i.departmentid FROM \"user\" u JOIN instructor i ON u.id = i.id WHERE i.departmentid = '{id}'",
                $"SELECT COUNT(*) FROM \"user\" u JOIN instructor i ON u.id = i.id WHERE i.departmentid = '{id}'", _conn);
            return instructors;
        }
    }