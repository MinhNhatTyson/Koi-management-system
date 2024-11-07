using BusinessLayer;
using BusinessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository
{
    public class PondRepo : IPondRepo
    {
        private readonly KoiCareContext _context;

        public PondRepo(KoiCareContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pond>> GetAllPondsAsync()
        {
            return await _context.Ponds.ToListAsync();
        }

        public async Task<Pond> GetPondByIdAsync(int pondId)
        {
            return await _context.Ponds.FindAsync(pondId);
        }

        public async Task AddPondAsync(Pond pond)
        {
            await _context.Ponds.AddAsync(pond);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePondAsync(Pond pond)
        {
            _context.Ponds.Update(pond);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePondAsync(int pondId)
        {
            var pond = await GetPondByIdAsync(pondId);
            if (pond != null)
            {
                _context.Ponds.Remove(pond);
                await _context.SaveChangesAsync();
            }
        }
    }
}
