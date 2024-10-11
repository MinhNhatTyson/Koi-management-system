using BusinessLayer.Entities;
using BusinessLayer.Request;
using BusinessLayer.Response;
using Microsoft.Extensions.Configuration;
using RepositoryLayer.Interface;
using ServiceLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Service
{
    public class KoiFishService : IKoiFishService
    {
        private readonly IKoiFishRepository koiFishRepository;
        private IConfiguration configuration;

        public KoiFishService(IKoiFishRepository koiFishRepository, IConfiguration configuration)
        {
            this.koiFishRepository = koiFishRepository;
            this.configuration = configuration;
        }
        public async Task<ResponseEntity<List<KoiFish>>> GetAll()
        {
            return await koiFishRepository.GetAll();
        }

        public async Task<ResponseEntity<KoiFish>> GetById(int id)
        {
            return await koiFishRepository.GetById(id);
        }
        public async Task<ResponseEntity<KoiFish>> Create(KoiFishRequestDTO koiFishRequestDTO)
        {
            return await koiFishRepository.Create(koiFishRequestDTO);
        }

        public async Task<ResponseEntity<KoiFish>> Update(int id, KoiFishRequestDTO koiFish)
        {
            return await koiFishRepository.Update(id, koiFish);
        }

        public async Task<ResponseEntity<bool>> Delete(int id)
        {
            return await koiFishRepository.Delete(id);
        }
    }
}
