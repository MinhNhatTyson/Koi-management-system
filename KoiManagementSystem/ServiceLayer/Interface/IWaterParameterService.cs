using BusinessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Interface
{
    public interface IWaterParameterService
    {
        Task<IEnumerable<WaterParameter>> GetAllPondsAsync();
        Task<WaterParameter> GetWaterParameterByIdAsync(int WaterParameterId);
        Task AddWaterParameterAsync(WaterParameter WaterParameter);
        Task UpdateWaterParameterAsync(WaterParameter WaterParameter);
        Task DeleteWaterParameterAsync(int WaterParameterId);
    }
}
