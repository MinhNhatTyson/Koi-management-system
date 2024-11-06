using BusinessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interface
{
    public interface IPondRepo
    {
        Task<IEnumerable<Pond>> GetAllPondsAsync();
        Task<Pond> GetPondByIdAsync(int pondId);
        Task AddPondAsync(Pond pond);
        Task UpdatePondAsync(Pond pond);
        Task DeletePondAsync(int pondId);
    }
}
