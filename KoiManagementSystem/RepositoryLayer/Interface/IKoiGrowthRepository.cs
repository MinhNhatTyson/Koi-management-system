using BusinessLayer.Entities;
using BusinessLayer.Request;
using BusinessLayer.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interface
{
    public interface IKoiGrowthRepository
    {
        Task<ResponseEntity<List<KoiGrowth>>> GetAll();
        Task<ResponseEntity<KoiGrowth>> GetById(int id);
        Task<ResponseEntity<KoiGrowth>> Create(KoiGrowthRequestDTO koiGrowthRequestDTO);
        Task<ResponseEntity<KoiGrowth>> Update(int id, KoiGrowthRequestDTO koiGrowth);
        Task<ResponseEntity<bool>> Delete(int id);
    }
}
