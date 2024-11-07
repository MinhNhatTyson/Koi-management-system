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
    public class WaterParameterService : IWaterParameterService
    {
        private readonly IWaterParameterRepo _waterRepository;

        public WaterParameterService(IWaterParameterRepo waterParameterRepo)
        {
            _waterRepository = waterParameterRepo;
        }
        public async Task AddWaterParameterAsync(WaterParameter WaterParameter)
        {
            await _waterRepository.AddWaterParameterAsync(WaterParameter);
        }

        public async Task DeleteWaterParameterAsync(int WaterParameterId)
        {
            await _waterRepository.DeleteWaterParameterAsync(WaterParameterId);
        }

        public async Task<IEnumerable<WaterParameter>> GetAllPondsAsync()
        {
            return await _waterRepository.GetAllWaterParamsAsync();
        }

        public async Task<WaterParameter> GetWaterParameterByIdAsync(int WaterParameterId)
        {
            return await _waterRepository.GetWaterParameterByIdAsync(WaterParameterId);
        }

        public async Task UpdateWaterParameterAsync(WaterParameter WaterParameter)
        {
            await _waterRepository.UpdateWaterParameterAsync(WaterParameter);
        }
    }
}
