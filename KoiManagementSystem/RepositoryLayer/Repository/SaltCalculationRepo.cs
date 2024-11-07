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
    public class SaltCalculationRepo : ISaltCalculationRepo
    {
        private readonly KoiCareContext _context;

        public SaltCalculationRepo(KoiCareContext context)
        {
            _context = context;
        }
        public async Task AddSaltCalculation(SaltCalculation saltCalculation)
        {
            await _context.SaltCalculations.AddAsync(saltCalculation);
            await _context.SaveChangesAsync();
        }

        public async Task<SaltCalculation> GetSaltCalculationById(int saltID)
        {
            return await _context.SaltCalculations.FindAsync(saltID);
        }

        public async Task<IEnumerable<SaltCalculation>> GetSaltCalculations()
        {
            return await _context.SaltCalculations.ToListAsync();
        }
    }
}
