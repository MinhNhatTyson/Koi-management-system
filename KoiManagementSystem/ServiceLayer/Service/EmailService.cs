using ServiceLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Service
{
    public class EmailService : IEmailService
    {
        private readonly SmtpClient _smtpClient;
        private readonly string _fromEmail;

        public EmailService(string smtpHost, int smtpPort, string fromEmail, string smtpUsername, string smtpPassword)
        {
            _smtpClient = new SmtpClient(smtpHost, smtpPort)
            {
                Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                EnableSsl = true // Sử dụng SSL
            };
            _fromEmail = fromEmail;
        }
        public EmailService(SmtpClient smtpClient, string fromEmail)
        {
            _smtpClient = smtpClient;
            _fromEmail = fromEmail;
        }
        public void Send(string toEmail, string subject, string body)
        {
            var mailMessage = new MailMessage
            {
                From = new MailAddress(_fromEmail),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            mailMessage.To.Add(toEmail);

            try
            {
                _smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                Console.WriteLine($"Error sending email: {ex.Message}");
            }
        }

    }
}