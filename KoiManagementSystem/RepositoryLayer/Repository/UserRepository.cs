using BusinessLayer;
using BusinessLayer.Entities;
using RepositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly KoiCareContext _context;

        public UserRepository(KoiCareContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserById(int userId)
        {
            return _context.Users.FirstOrDefault(n => n.UserId == userId);
        }
    }
}
