using BusinessLayer;
using BusinessLayer.Entities;
using BusinessLayer.Request;
using RepositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository
{
    public class AuthenRepository : IAuthenRepository
    {
        private readonly KoiCareContext _context;

        public AuthenRepository(KoiCareContext context)
        {
            _context = context;
        }

        public async Task<User> AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public async Task<User> findAccount(string existingEmail)
        {
            var user = _context.Users.FirstOrDefault(n => n.Email == existingEmail);
            return user;

        }

        public async Task<string> findByEmail(string email)
        {
           var user = _context.Users.FirstOrDefault(n=>n.Email == email);
            if (user != null)
            {
                return user.Email;
            }

            return null; 
        }
    }
}
