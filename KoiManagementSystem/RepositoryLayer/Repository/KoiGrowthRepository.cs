using BusinessLayer.Entities;
using BusinessLayer.Response;
using BusinessLayer;
using RepositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BusinessLayer.Request;

namespace RepositoryLayer.Repository
{
    public class KoiGrowthRepository : IKoiGrowthRepository
    {
        private readonly KoiCareContext _context;

        public KoiGrowthRepository(KoiCareContext context)
        {
            _context = context;
        }

        public async Task<ResponseEntity<List<KoiGrowth>>> GetAll()
        {
            try
            {
                var koiGrowths = await _context.KoiGrowths.Include(fs => fs.Koi).ToListAsync(); 
                return new ResponseEntity<List<KoiGrowth>>(koiGrowths);
            }
            catch (Exception ex)
            {
                return new ResponseEntity<List<KoiGrowth>>(ex.Message);
            }
        }

        public async Task<ResponseEntity<KoiGrowth>> GetById(int id)
        {
            try
            {
                var koiGrowth = await _context.KoiGrowths.Include(fs => fs.Koi)
    .FirstOrDefaultAsync(fs => fs.GrowthId == id);
                if (koiGrowth == null)
                {
                    return new ResponseEntity<KoiGrowth>("Koi Growth not found");
                }
                return new ResponseEntity<KoiGrowth>(koiGrowth);
            }
            catch (Exception ex)
            {
                return new ResponseEntity<KoiGrowth>(ex.Message);
            }
        }

        public async Task<ResponseEntity<KoiGrowth>> Create(KoiGrowthRequestDTO koiGrowthRequestDTO)
        {
            try
            {
                var koiGrowth = new KoiGrowth
                {
                    GrowthDate = koiGrowthRequestDTO.GrowthDate,
                    Size = koiGrowthRequestDTO.Size,
                    Weight = koiGrowthRequestDTO.Weight,
                    Notes = koiGrowthRequestDTO.Notes,
                };
                _context.KoiGrowths.Add(koiGrowth);
                await _context.SaveChangesAsync();
                return new ResponseEntity<KoiGrowth>(koiGrowth);
            }
            catch (Exception ex)
            {
                return new ResponseEntity<KoiGrowth>(ex.Message);
            }
        }

        public async Task<ResponseEntity<KoiGrowth>> Update(int id, KoiGrowthRequestDTO koiGrowth)
        {
            try
            {
                var existingKoiGrowth = await _context.KoiGrowths.FindAsync(id);
                if (existingKoiGrowth == null)
                {
                    return new ResponseEntity<KoiGrowth>("Koi Growth not found");
                }
                var koi = await _context.KoiFishes.FindAsync(koiGrowth.KoiId);
                if (koi == null) return new ResponseEntity<KoiGrowth>("No Koi found with such id!!");

                existingKoiGrowth.GrowthDate = koiGrowth.GrowthDate;
                existingKoiGrowth.Size = koiGrowth.Size;
                existingKoiGrowth.Weight = koiGrowth.Weight;
                existingKoiGrowth.Notes = koiGrowth.Notes;
                await _context.SaveChangesAsync();
                return new ResponseEntity<KoiGrowth>(existingKoiGrowth);
            }
            catch (Exception ex)
            {
                return new ResponseEntity<KoiGrowth>(ex.Message);
            }
        }

        public bool UpdateKoiId(int id, int KoiId)
        {
            try
            {
                KoiGrowth existingKoiGrowth = _context.KoiGrowths.FindAsync(id).Result;
                if (existingKoiGrowth == null)
                {
                    return false;
                }
                var koi =  _context.KoiFishes.FindAsync(KoiId).Result;
                if (koi == null) return false;

                existingKoiGrowth.KoiId = KoiId;
                existingKoiGrowth.Koi = koi;                
                 _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<ResponseEntity<bool>> Delete(int id)
        {
            try
            {
                var koiGrowth = await _context.KoiGrowths.FindAsync(id);
                if (koiGrowth == null)
                {
                    return new ResponseEntity<bool>("Koi Growth not found");
                }
                _context.KoiGrowths.Remove(koiGrowth);
                await _context.SaveChangesAsync();
                return new ResponseEntity<bool>(true);
            }
            catch (Exception ex)
            {
                return new ResponseEntity<bool>(ex.Message);
            }
        }
    }
}
