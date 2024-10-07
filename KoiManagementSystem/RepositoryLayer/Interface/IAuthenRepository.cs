using BusinessLayer.Entities;
using BusinessLayer.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interface
{
    public interface IAuthenRepository
    {
        Task<User> AddUser(User user);
        Task<User> findAccount(string existingEmail);
        Task<string> findByEmail(string email);
       
        
    }
}
