using BusinessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interface
{
    public interface ISaltCalculationRepo
    {
        Task<IEnumerable<SaltCalculation>> GetSaltCalculations();
        Task<SaltCalculation> GetSaltCalculationById(int saltID);
        Task AddSaltCalculation(SaltCalculation saltCalculation);
    }
}
