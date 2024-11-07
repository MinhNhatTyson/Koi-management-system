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
    public class SaltCalculationService : ISaltCalculationService
    {
        private readonly ISaltCalculationRepo _saltRepository;

        public SaltCalculationService(ISaltCalculationRepo waterParameterRepo)
        {
            _saltRepository = waterParameterRepo;
        }
        public async Task AddSaltCalculation(SaltCalculation saltCalculation)
        {
            await _saltRepository.AddSaltCalculation(saltCalculation);
        }

        public async Task<SaltCalculation> GetSaltCalculationById(int saltID)
        {
            return await _saltRepository.GetSaltCalculationById(saltID);
        }

        public async Task<IEnumerable<SaltCalculation>> GetSaltCalculations()
        {
            return await _saltRepository.GetSaltCalculations();
        }
    }
}
