using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using Data;

namespace API;

public class Utils
{
    
    public static string GenerateResetToken()
    {
        Random random = new Random();
        return random.Next(100000, 999999).ToString();
    }

    public static async Task SendEmailAsync(string recipientEmail, string subject, string body)
    {
        string smtpServer = "smtp.elasticemail.com";
        int smtpPort = 2525;
        string smtpUsername = "b21945939@cs.hacettepe.edu.tr";
        string smtpPassword = "6CCE9ACCDCB44A7336BA4B2920B9D549A45B";

        using (SmtpClient smtpClient = new SmtpClient(smtpServer, smtpPort))
        {
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
            smtpClient.EnableSsl = true;

            using (MailMessage mailMessage = new MailMessage())
            {
                mailMessage.From = new MailAddress("b.bubus20@hotmail.com");
                mailMessage.To.Add(recipientEmail);
                mailMessage.Subject = subject;
                mailMessage.Body = body;

                await smtpClient.SendMailAsync(mailMessage);
            }
        }
    }

    public static async Task<bool> CookieController( ClaimsPrincipal user, IUserRepository userRepository)
    {
        if(user.Identity != null && !user.Identity.IsAuthenticated) return false;
        var id = Convert.ToInt32(user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.SerialNumber)?.Value);
        var controlUser = await userRepository.GetUser(id);
        if (controlUser is null) return false;
        return true;
    }
}