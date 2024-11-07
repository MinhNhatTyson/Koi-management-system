using BusinessLayer.Entities;
using RepositoryLayer.Interface;
using ServiceLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Service
{
    public class PondService : IPondService
    {
        private readonly IPondRepo _pondRepository;

        public PondService(IPondRepo pondRepository)
        {
            _pondRepository = pondRepository;
        }

        public async Task<IEnumerable<Pond>> GetAllPondsAsync()
        {
            return await _pondRepository.GetAllPondsAsync();
        }

        public async Task<Pond> GetPondByIdAsync(int pondId)
        {
            return await _pondRepository.GetPondByIdAsync(pondId);
        }

        public async Task AddPondAsync(Pond pond)
        {
            await _pondRepository.AddPondAsync(pond);
        }

        public async Task UpdatePondAsync(Pond pond)
        {
            await _pondRepository.UpdatePondAsync(pond);
        }

        public async Task DeletePondAsync(int pondId)
        {
            await _pondRepository.DeletePondAsync(pondId);
        }
    }
}
