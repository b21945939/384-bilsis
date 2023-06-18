using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using Models;

namespace API;

public class RegistrationDto
{
    public int Id { get; set; }
    public string Email { get; set; }
    [DataType(DataType.Password)] public string Password { get; set; }
    public UserType Type { get; set; }
}

public class TokenDto
{
    public int token { get; set; }
    public string password { get; set; }
}
public class LoginDto
{
    public int Id { get; set; }
    [DataType(DataType.Password)] public string Password { get; set; }
}

public class CreationDto
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public UserType Type { get; set; }
}

public class ChangePasswordDto
{
    [DataType(DataType.Password)] public string OldPassword { get; set; }
    [DataType(DataType.Password)] public string NewPassword { get; set; }
}

public class ChangeInfoDto
{
    public string Address { get; set; }
    public string PhoneNumber { get; set; }
}
public class EmailDto
{
    public string Email { get; set; }
}

[Route("user")]
[ApiController]
public class UserController : ControllerBase
{
    private IUserRepository _userRepository;
    private IUtilsRepository _utilsRepository;

    public UserController(IUserRepository userRepository, IUtilsRepository utilsRepository)
    {
        _userRepository = userRepository;
        _utilsRepository = utilsRepository;
    }

    [HttpGet("users/{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var user = await _userRepository.GetUser(id);
        if (user is null) return BadRequest("User is not found!");
        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var id = loginDto.Id;
        var password = loginDto.Password;
        var user = await _userRepository.GetUser(id);
        if (user is null) return BadRequest("User is not found!");
        var isCorrect = Hash.VerifyPassword(password, user.HashedPassword);
        if (!isCorrect) return BadRequest("Password is not correct!");
        var claims = new List<Claim>
        {
            new(ClaimTypes.SerialNumber, Convert.ToString(id))
        };
        var claimsIdentity = new ClaimsIdentity(claims, "Login");
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity));
        return Ok(user);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationDto registration)
    {
        var id = registration.Id;
        var email = registration.Email;
        var password = registration.Password;
        var type = registration.Type;
        var user = await _userRepository.GetUser(id);
        if (user is null) return BadRequest("User is not found!");
        if (user.HashedPassword != "") return BadRequest("You have already registered!");
        if (!user.Email.Equals(email)) return BadRequest("Wrong Email!");
        if (!user.UserType.Equals(type)) return BadRequest("Wrong Type!");
        var hashedPassword = Hash.HashPassword(password);
        var _user = await _userRepository.SetUser(id, email, hashedPassword, type);
        return Ok(_user);
    }

    [HttpGet("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync();
        return Ok();
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreationDto creator)
    {
        var id = creator.Id;
        var _user = await _userRepository.GetUser(id);
        if (_user is not null) return BadRequest("Written id is in use! ID: " + id);
        var email = creator.Email;
        var firstName = creator.FirstName;
        var lastName = creator.LastName;
        var type = creator.Type;
        var user = await _userRepository.CreateUser(id, email, firstName, lastName, type);
        return Ok(user);
    }

    [HttpGet("personal")]
    public async Task<IActionResult> PersonalControl()
    {
        if (!await Utils.CookieController(HttpContext.User, _userRepository)) return BadRequest();
        var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.SerialNumber)?.Value);
        var user = await _userRepository.GetUser(id);
        return Ok(user);
    }

    [HttpPost("sendtoken")]
    public async Task<IActionResult> SendToken([FromBody] EmailDto email)
    {
        if (string.IsNullOrWhiteSpace(email.Email))
        {
            return BadRequest("Invalid email address.");
        }

        var user = await _userRepository.GetUserFromEmail(email.Email);
        if (user is null || user.Email is null) return BadRequest("Invalid email address.");

        var resetToken = Utils.GenerateResetToken();
        var resetUrl = $"{resetToken}";
        var emailSubject = "Password Reset";
        var emailBody = $"Please click the following link to reset your password: {resetUrl}";
        
        await Utils.SendEmailAsync(email.Email, emailSubject, emailBody);
        await _utilsRepository.SetResetToken(user.Id, Int32.Parse(resetToken));
        return Ok("Password reset email sent successfully.");
    }

    [HttpPost("reset")]
    public async Task<IActionResult> AcceptResetPassword([FromBody] TokenDto token)
    {
        var isOk = await _utilsRepository.DeleteResetToken(token.token,Hash.HashPassword(token.password));
        if(isOk) return Ok(token);
        return BadRequest();
    }

    [HttpPatch("changeinfo")]
    public async Task<IActionResult> ChangeInfo([FromBody] ChangeInfoDto changeInfoDto)
    {
        if (!await Utils.CookieController(HttpContext.User, _userRepository)) return BadRequest();
        var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.SerialNumber)?.Value);
        var user = await _userRepository.GetUser(id);
        var address = changeInfoDto.Address;
        var phoneNumber = changeInfoDto.PhoneNumber;
        await _userRepository.ChangeInfo(id, address, phoneNumber);
        return Ok(user);
    }

    [HttpPatch("changepassword")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
    {
        if (!await Utils.CookieController(HttpContext.User, _userRepository)) return BadRequest();
        var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.SerialNumber)?.Value);
        var user = await _userRepository.GetUser(id);
        var oldPassword = changePasswordDto.OldPassword;
        var newPassword = changePasswordDto.NewPassword;
        var isCorrect = Hash.VerifyPassword(oldPassword, user.HashedPassword);
        if (!isCorrect) return BadRequest("Password is not correct!");
        var hashedPassword = Hash.HashPassword(newPassword);
        await _userRepository.ChangePassword(id, hashedPassword);
        return Ok(user);
    }

    [HttpPost("ban/{id:int}")]
    public async Task<IActionResult> Ban(int id)
    {
        var user = await _userRepository.GetUser(id);
        if (user is null) return BadRequest("User is not found!");
        user = await _userRepository.BanUser(id);
        return Ok(user);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        var users = await _userRepository.GetAllUsers();
        return Ok(users);
    }

    [HttpGet("all/{type}")]
    public async Task<IActionResult> GetAllByType(UserType type)
    {
        var users = await _userRepository.GetUsersByType(type);
        return Ok(users);
    }

    [HttpGet("fromemail/{email}")]
    public async Task<IActionResult> GetUserFromEmail(string email)
    {
        var user = await _userRepository.GetUserFromEmail(email);
        return Ok(user);
    }

    [HttpGet("banlist")]
    public async Task<IActionResult> GetBanList()
    {
        var users = await _userRepository.GetBannedUsers();
        return Ok(users);
    }

    [HttpPost("unban/{id:int}")]
    public async Task<IActionResult> Unban(int id)
    {
        var user = await _userRepository.GetUser(id);
        if (user is null) return BadRequest("User is not found!");
        await _userRepository.UnbanUser(id);
        return Ok(user);
    }

    [HttpDelete("delete/{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = await _userRepository.GetUser(id);
        if (user is null) return BadRequest("User is not found!");
        await _userRepository.DeleteUser(id);
        return Ok(user);
    }

    [HttpGet("instructors")]
    public async Task<IActionResult> GetInstructorsByDepartmentId()
    {
        if (!await Utils.CookieController(HttpContext.User, _userRepository)) return BadRequest();
        var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.SerialNumber)?.Value);
        var users = await _userRepository.GetAllInstructorsByDepartmentId(id);
        return Ok(users);
    }
}