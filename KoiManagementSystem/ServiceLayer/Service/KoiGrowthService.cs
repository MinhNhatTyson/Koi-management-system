using BusinessLayer.Entities;
using BusinessLayer.Request;
using BusinessLayer.Response;
using BusinessLayer.Validator;
using Microsoft.Extensions.Configuration;
using RepositoryLayer.Interface;
using RepositoryLayer.Repository;
using ServiceLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Service
{
    public class KoiGrowthService : IKoiGrowthService
    {
        private readonly IKoiGrowthRepository koiFishRepository;
        public KoiGrowthService(IKoiGrowthRepository koiFishRepository)
        {
            this.koiFishRepository = koiFishRepository;
        }
        public async Task<ResponseEntity<KoiGrowth>> Create(KoiGrowthRequestDTO koiGrowthRequestDTO)
        {
            var validator = new KoiGrowthRequestDTOValidator();
            var validationResult = await validator.ValidateAsync(koiGrowthRequestDTO);

            if (!validationResult.IsValid)
            {
                var errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
                return new ResponseEntity<KoiGrowth>(string.Join(", ", errors));
            }

            // If the validation is successful, proceed with creating the KoiGrowth entity
            return await koiFishRepository.Create(koiGrowthRequestDTO);
        }

        public async Task<ResponseEntity<bool>> Delete(int id)
        {
            return await koiFishRepository.Delete(id);
        }

        public async Task<ResponseEntity<List<KoiGrowth>>> GetAll()
        {
            return await koiFishRepository.GetAll();
        }

        public async Task<ResponseEntity<KoiGrowth>> GetById(int id)
        {
            return await koiFishRepository.GetById(id);
        }

        public async Task<ResponseEntity<KoiGrowth>> Update(int id, KoiGrowthRequestDTO koiGrowth)
        {
            return await koiFishRepository.Update(id, koiGrowth);
        }
    }
}
