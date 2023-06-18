using System.Threading.Tasks;
using API;
using Microsoft.AspNetCore.Mvc;
using Models;
using Moq;
using NUnit.Framework;

namespace MyProject.Tests
{
    [TestFixture]
    public class UserControllerTests
    {
        private UserController _userController;
        private Mock<IUserRepository> _mockUserRepository;
        private Mock<IUtilsRepository> _mockUtilsRepository;

        [SetUp]
        public void Setup()
        {
            _mockUserRepository = new Mock<IUserRepository>();
            _mockUtilsRepository = new Mock<IUtilsRepository>();
            _userController = new UserController(_mockUserRepository.Object, _mockUtilsRepository.Object);
        }

        [Test]
        public async Task Login_WithValidCredentials_ReturnsOkResult()
        {
            
            var loginDto = new LoginDto
            {
                Id = 1,
                Password = "password123"
            };
            var user = new User
            {
                Id = 1,
                HashedPassword = Hash.HashPassword("password123") // Assuming you have a static method to hash passwords
            };
            _mockUserRepository.Setup(r => r.GetUser(loginDto.Id)).ReturnsAsync(user);

            var result = await _userController.Login(loginDto);
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task Login_WithInvalidCredentials_ReturnsBadRequest()
        {
            
            var loginDto = new LoginDto
            {
                Id = 1,
                Password = "invalidpassword"
            };
            var user = new User
            {
                Id = 1,
                HashedPassword = Hash.HashPassword("password123")
            };
            _mockUserRepository.Setup(r => r.GetUser(loginDto.Id)).ReturnsAsync(user);

            var result = await _userController.Login(loginDto);
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task Login_WithNonExistentUser_ReturnsBadRequest()
        {
            
            var loginDto = new LoginDto
            {
                Id = 1,
                Password = "password123"
            };
            _mockUserRepository.Setup(r => r.GetUser(loginDto.Id)).ReturnsAsync((User)null);

            var result = await _userController.Login(loginDto);
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task Register_WithValidRegistration_ReturnsOkResult()
        {
            
            var registrationDto = new RegistrationDto
            {
                Id = 1,
                Email = "test@example.com",
                Password = "password123",
                Type = UserType.Regular
            };
            var user = new User
            {
                Id = 1,
                HashedPassword = "",
                
            };
            _mockUserRepository.Setup(r => r.GetUser(registrationDto.Id)).ReturnsAsync(user);

            var result = await _userController.Register(registrationDto);
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task Register_WithExistingUser_ReturnsBadRequest()
        {
            
            var registrationDto = new RegistrationDto
            {
                Id = 1,
                Email = "test@example.com",
                Password = "password123",
                Type = UserType.Regular
            };
            var user = new User
            {
                Id = 1,
                HashedPassword = "somehashedpassword",
                
            };
            _mockUserRepository.Setup(r => r.GetUser(registrationDto.Id)).ReturnsAsync(user);

            var result = await _userController.Register(registrationDto);
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task Logout_ReturnsOkResult()
        {
            
            var result = await _userController.Logout();
            Assert.IsInstanceOf<OkResult>(result);
        }

        [Test]
        public async Task Create_WithValidCreation_ReturnsOkResult()
        {
            
            var creationDto = new CreationDto
            {
                Id = 1,
                Email = "test@example.com",
                FirstName = "John",
                LastName = "Doe",
                Type = UserType.Regular
            };
            var user = new User
            {
                Id = 1,
                
            };
            _mockUserRepository.Setup(r => r.GetUser(creationDto.Id)).ReturnsAsync((User)null);
            _mockUserRepository.Setup(r => r.CreateUser(
                creationDto.Id,
                creationDto.Email,
                creationDto.FirstName,
                creationDto.LastName,
                creationDto.Type)).ReturnsAsync(user);

            
            var result = await _userController.Create(creationDto);
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task Create_WithExistingId_ReturnsBadRequest()
        {
            
            var creationDto = new CreationDto
            {
                Id = 1,
                Email = "test@example.com",
                FirstName = "John",
                LastName = "Doe",
                Type = UserType.Regular
            };
            var existingUser = new User
            {
                Id = 1,
                
            };
            _mockUserRepository.Setup(r => r.GetUser(creationDto.Id)).ReturnsAsync(existingUser);

            var result = await _userController.Create(creationDto);
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task PersonalControl_WithValidUserId_ReturnsOkResult()
        {
            
            var userId = 1;
            var claims = new[]
            {
                new Claim(ClaimTypes.SerialNumber, userId.ToString())
            };
            var user = new User
            {
                Id = userId,
                HashedPassword = "HiddenPassword",
                
            };
            _mockUserRepository.Setup(r => r.GetUser(userId)).ReturnsAsync(user);
            _userController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(new ClaimsIdentity(claims))
                }
            };

            var result = await _userController.PersonalControl();
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task PersonalControl_WithInvalidUserId_ReturnsBadRequest()
        {
            
            var userId = 1;
            var claims = new[]
            {
                new Claim(ClaimTypes.SerialNumber, userId.ToString())
            };
            _mockUserRepository.Setup(r => r.GetUser(userId)).ReturnsAsync((User)null);
            _userController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(new ClaimsIdentity(claims))
                }
            };
            
            var result = await _userController.PersonalControl();
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task SendToken_WithValidEmail_ReturnsOkResult()
        {
            
            var email = "test@example.com";
            var user = new User
            {
                Id = 1,
                Email = email,
                
            };
            _mockUserRepository.Setup(r => r.GetUserFromEmail(email)).ReturnsAsync(user);
            _mockUtilsRepository.Setup(r => r.SetResetToken(user.Id, It.IsAny<int>())).Returns(Task.CompletedTask);

            var result = await _userController.SendToken(email);
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task SendToken_WithInvalidEmail_ReturnsBadRequest()
        {
            
            var email = "invalidemail@example.com";
            _mockUserRepository.Setup(r => r.GetUserFromEmail(email)).ReturnsAsync((User)null);
            var result = await _userController.SendToken(email);
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task SendToken_WithInvalidEmail_ReturnsBadRequest()
        {
            
            string invalidEmail = null;
            var result = await _userController.SendToken(invalidEmail);
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task AcceptResetPassword_WithValidToken_ReturnsOkResult()
        {
            
            var token = "12345";
            _mockUtilsRepository.Setup(r => r.DeleteResetToken(It.IsAny<int>())).Returns(Task.CompletedTask);

            
            var result = await _userController.AcceptResetPassword(token);

            Assert.IsInstanceOf<OkObjectResult>(result);
            Assert.AreEqual(token, (result as OkObjectResult)?.Value);
        }

        [Test]
        public async Task ChangeInfo_WithValidChangeInfoDto_ReturnsOkResult()
        {
            
            var id = 1;
            var claims = new[]
            {
                new Claim(ClaimTypes.SerialNumber, id.ToString())
            };
            var changeInfoDto = new ChangeInfoDto
            {
                Address = "New Address",
                PhoneNumber = "1234567890",
            };
            var user = new User
            {
                Id = id,
                
            };
            _mockUserRepository.Setup(r => r.GetUser(id)).ReturnsAsync(user);
            _mockUserRepository.Setup(r => r.ChangeInfo(id, changeInfoDto.Address, changeInfoDto.PhoneNumber)).Returns(Task.CompletedTask);
            _userController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(new ClaimsIdentity(claims))
                }
            };

            var result = await _userController.ChangeInfo(changeInfoDto);
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task ChangeInfo_WithInvalidUserId_ReturnsBadRequest()
        {
            
            var id = 1;
            var claims = new[]
            {
                new Claim(ClaimTypes.SerialNumber, id.ToString())
            };
            var changeInfoDto = new ChangeInfoDto
            {
                Address = "New Address",
                PhoneNumber = "1234567890",
            };
            _mockUserRepository.Setup(r => r.GetUser(id)).ReturnsAsync((User)null);
            _userController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(new ClaimsIdentity(claims))
                }
            };

            var result = await _userController.ChangeInfo(changeInfoDto);
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }
        [Test]
        public async Task ChangePassword_WithValidChangePasswordDto_ReturnsOkResult()
        {
            
            var id = 1;
            var claims = new[]
            {
                new Claim(ClaimTypes.SerialNumber, id.ToString())
            };
            var changePasswordDto = new ChangePasswordDto
            {
                OldPassword = "OldPassword",
                NewPassword = "NewPassword",
            };
            var user = new User
            {
                Id = id,
                HashedPassword = Hash.HashPassword("OldPassword"), // Set the original hashed password
            };
            _mockUserRepository.Setup(r => r.GetUser(id)).ReturnsAsync(user);
            _mockUserRepository.Setup(r => r.ChangePassword(id, It.IsAny<string>())).Returns(Task.CompletedTask);
            _userController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(new ClaimsIdentity(claims))
                }
            };
            var result = await _userController.ChangePassword(changePasswordDto);

            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task ChangePassword_WithInvalidUserId_ReturnsBadRequest()
        {
            
            var id = 1;
            var claims = new[]
            {
                new Claim(ClaimTypes.SerialNumber, id.ToString())
            };
            var changePasswordDto = new ChangePasswordDto
            {
                OldPassword = "OldPassword",
                NewPassword = "NewPassword",
            };
            _mockUserRepository.Setup(r => r.GetUser(id)).ReturnsAsync((User)null);
            _userController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(new ClaimsIdentity(claims))
                }
            };

            
            var result = await _userController.ChangePassword(changePasswordDto);

            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task Ban_WithValidUserId_ReturnsOkResult()
        {

            var id = 1;
            var user = new User
            {
                Id = id,
                
            };
            _mockUserRepository.Setup(r => r.GetUser(id)).ReturnsAsync(user);
            _mockUserRepository.Setup(r => r.BanUser(id)).Returns(Task.CompletedTask);

            
            var result = await _userController.Ban(id);

            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task Ban_WithInvalidUserId_ReturnsBadRequest()
        {
            
            var id = 1;
            _mockUserRepository.Setup(r => r.GetUser(id)).ReturnsAsync((User)null);
            var result = await _userController.Ban(id);
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task GetAll_ReturnsOkResult()
        {
            var users = new List<User>
            {
                new User { Id = 1 },
                new User { Id = 2 },
                new User { Id = 3 }
            };
            _mockUserRepository.Setup(r => r.GetAllUsers()).ReturnsAsync(users);

            var result = await _userController.GetAll();

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.AreEqual(users, okResult.Value);
        }

        [Test]
        public async Task GetAllByType_WithValidType_ReturnsOkResult()
        {
            var type = UserType.Admin;
            var users = new List<User>
            {
                new User { Id = 1, Type = UserType.Admin },
                new User { Id = 2, Type = UserType.Regular },
                new User { Id = 3, Type = UserType.Admin }
            };
            _mockUserRepository.Setup(r => r.GetUsersByType(type)).ReturnsAsync(users);

            var result = await _userController.GetAllByType(type);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.AreEqual(users, okResult.Value);
        }

        [Test]
        public async Task GetUserFromEmail_WithValidEmail_ReturnsOkResult()
        {
            var email = "test@example.com";
            var user = new User { Id = 1, Email = email };
            _mockUserRepository.Setup(r => r.GetUserFromEmail(email)).ReturnsAsync(user);

            var result = await _userController.GetUserFromEmail(email);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.AreEqual(user, okResult.Value);
        }

        [Test]
        public async Task GetBanList_ReturnsOkResult()
        {
            var bannedUsers = new List<User>
            {
                new User { Id = 1, IsBanned = true },
                new User { Id = 2, IsBanned = true },
                new User { Id = 3, IsBanned = true }
            };
            _mockUserRepository.Setup(r => r.GetBannedUsers()).ReturnsAsync(bannedUsers);

            var result = await _userController.GetBanList();

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.AreEqual(bannedUsers, okResult.Value);
        }
        [Test]
        public async Task Unban_WithValidUserId_ReturnsOkResult()
        {
            var id = 1;
            var user = new User { Id = id };
            _mockUserRepository.Setup(r => r.GetUser(id)).ReturnsAsync(user);

            var result = await _userController.Unban(id);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.AreEqual(user, okResult.Value);
        }

        [Test]
        public async Task Unban_WithInvalidUserId_ReturnsBadRequest()
        {
            var id = 1;
            _mockUserRepository.Setup(r => r.GetUser(id)).ReturnsAsync((User)null);

            var result = await _userController.Unban(id);

            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task Delete_WithValidUserId_ReturnsOkResult()
        {
            var id = 1;
            var user = new User { Id = id };
            _mockUserRepository.Setup(r => r.GetUser(id)).ReturnsAsync(user);

            var result = await _userController.Delete(id);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.AreEqual(user, okResult.Value);
        }

        [Test]
        public async Task Delete_WithInvalidUserId_ReturnsBadRequest()
        {
            var id = 1;
            _mockUserRepository.Setup(r => r.GetUser(id)).ReturnsAsync((User)null);

            var result = await _userController.Delete(id);

            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task Get_WithValidUserId_ReturnsOkResult()
        {
            var id = 1;
            var user = new User { Id = id };
            _mockUserRepository.Setup(r => r.GetUser(id)).ReturnsAsync(user);

            var result = await _userController.Get(id);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.AreEqual(user, okResult.Value);
        }

        [Test]
        public async Task Get_WithInvalidUserId_ReturnsBadRequest()
        {
            var id = 1;
            _mockUserRepository.Setup(r => r.GetUser(id)).ReturnsAsync((User)null);

            var result = await _userController.Get(id);

            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }
    }
}
