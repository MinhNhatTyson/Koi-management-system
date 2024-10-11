﻿using BusinessLayer.Entities;
using BusinessLayer.Request;
using BusinessLayer.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Interface
{
    public interface IKoiFishService
    {
        Task<ResponseEntity<List<KoiFish>>> GetAll();
        Task<ResponseEntity<KoiFish>> GetById(int id);
        Task<ResponseEntity<KoiFish>> Create(KoiFishRequestDTO koiFishRequestDTO);
        Task<ResponseEntity<KoiFish>> Update(int id, KoiFishRequestDTO koiFish);
        Task<ResponseEntity<bool>> Delete(int id);
    }
}
