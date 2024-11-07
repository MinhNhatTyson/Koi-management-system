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
    public class WaterParameterRepo : IWaterParameterRepo
    {
        private readonly KoiCareContext _context;

        public WaterParameterRepo(KoiCareContext context)
        {
            _context = context;
        }
        public async Task AddWaterParameterAsync(WaterParameter WaterParameter)
        {
            await _context.WaterParameters.AddAsync(WaterParameter);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteWaterParameterAsync(int WaterParameterId)
        {
            var pond = await GetWaterParameterByIdAsync(WaterParameterId);
            if (pond != null)
            {
                _context.WaterParameters.Remove(pond);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<WaterParameter>> GetAllWaterParamsAsync()
        {
            return await _context.WaterParameters.ToListAsync();
        }

        public async Task<WaterParameter> GetWaterParameterByIdAsync(int WaterParameterId)
        {
            return await _context.WaterParameters.FindAsync(WaterParameterId);
        }

        public async Task UpdateWaterParameterAsync(WaterParameter WaterParameter)
        {
            _context.WaterParameters.Update(WaterParameter);
            await _context.SaveChangesAsync();
        }
    }
}
