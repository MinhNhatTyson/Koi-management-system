using BusinessLayer;
using BusinessLayer.Entities;
using BusinessLayer.Request;
using BusinessLayer.Response;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository
{
    public class KoiFishRepository : IKoiFishRepository
    {
        private readonly KoiCareContext _context;

        public KoiFishRepository(KoiCareContext context)
        {
            _context = context;
            
        }

        public bool updateKoiId(int koiGrowthID, int koiId)
        {
            try
            {
                KoiGrowth existingKoiGrowth = _context.KoiGrowths.FindAsync(koiGrowthID).Result;
                if (existingKoiGrowth == null)
                {
                    return false;
                }
                var koi = _context.KoiFishes.FindAsync(koiId).Result;
                if (koi == null) return false;

                existingKoiGrowth.KoiId = koiId;
                existingKoiGrowth.Koi = koi;
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool updateFeedId(int feedId, int koiId)
        {
            try
            {
                FeedSchedule existingKoiGrowth = _context.FeedSchedules.FindAsync(feedId).Result;
                if (existingKoiGrowth == null)
                {
                    return false;
                }
                var koi = _context.KoiFishes.FindAsync(koiId).Result;
                if (koi == null) return false;

                existingKoiGrowth.KoiId = koiId;
                existingKoiGrowth.Koi = koi;
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<ResponseEntity<List<KoiFish>>> GetAll()
        {
            try
            {
                var koiFishes = await _context.KoiFishes.ToListAsync();
                return new ResponseEntity<List<KoiFish>>(koiFishes);
            }
            catch (Exception ex)
            {
                return new ResponseEntity<List<KoiFish>>(ex.Message);
            }
        }

        public async Task<ResponseEntity<KoiFish>> GetById(int id)
        {
            try
            {
                var koiFish = await _context.KoiFishes.FindAsync(id);
                if (koiFish == null)
                {
                    return new ResponseEntity<KoiFish>("Koi Fish not found");
                }
                return new ResponseEntity<KoiFish>(koiFish);
            }
            catch (Exception ex)
            {
                return new ResponseEntity<KoiFish>(ex.Message);
            }
        }

        public async Task<ResponseEntity<KoiFish>> Create(KoiFishRequestDTO koiFishRequestDTO)
        {
            try
            {
                var koiFish = new KoiFish
                {
                    Name = koiFishRequestDTO.Name,
                    Image = koiFishRequestDTO.Image,
                    Age = koiFishRequestDTO.Age,
                    Size = koiFishRequestDTO.Size,
                    Weight = koiFishRequestDTO.Weight,
                    Gender = koiFishRequestDTO.Gender,
                    Breed = koiFishRequestDTO.Breed,
                    Origin = koiFishRequestDTO.Origin,
                    Price = koiFishRequestDTO.Price,
                    PondId = koiFishRequestDTO.PondId,
                };
                _context.KoiFishes.Add(koiFish);
                await _context.SaveChangesAsync();
                return new ResponseEntity<KoiFish>(koiFish);
            }
            catch (Exception ex)
            {
                return new ResponseEntity<KoiFish>(ex.Message);
            }
        }

        public async Task<ResponseEntity<KoiFish>> Update(int id, KoiFishRequestDTO koiFish)
        {
            try
            {
                var existingKoiFish = await _context.KoiFishes.FindAsync(id);
                if (existingKoiFish == null)
                {
                    return new ResponseEntity<KoiFish>("Koi Fish not found");
                }

                // Update KoiFish properties
                existingKoiFish.Name = koiFish.Name;
                existingKoiFish.Image = koiFish.Image;
                existingKoiFish.Age = koiFish.Age;
                existingKoiFish.Size = koiFish.Size;
                existingKoiFish.Weight = koiFish.Weight;
                existingKoiFish.Gender = koiFish.Gender;
                existingKoiFish.Breed = koiFish.Breed;
                existingKoiFish.Origin = koiFish.Origin;
                existingKoiFish.Price = koiFish.Price;
                existingKoiFish.PondId = koiFish.PondId;

                // Update KoiGrowth plans
                if (koiFish.KoiGrowthIds != null)
                {
                    int count = 0;
                    foreach (var koiGrowthId in koiFish.KoiGrowthIds)
                    {
                        var existingKoiGrowth = await _context.KoiGrowths.FindAsync(koiGrowthId);
                        if (existingKoiGrowth == null)
                        {
                            return new ResponseEntity<KoiFish>("No growth plans found with such id");
                        }
                        else
                        {
                            if(count == 0) existingKoiFish.KoiGrowths.Clear();
                            
                            existingKoiFish.KoiGrowths.Add(existingKoiGrowth);
                            if(!updateKoiId(koiGrowthId, existingKoiFish.KoiId)) return new ResponseEntity<KoiFish>(" wrong while trying to assign a new koi for a growth plan"); 

                            count++;
                        }
                    }
                }

                // Update FeedSchedules
                if (koiFish.FeedScheduleIds != null)
                {
                    int count = 0;
                    foreach (var feedScheduleId in koiFish.FeedScheduleIds)
                    {
                        var existingFeedSchedule = await _context.FeedSchedules.FindAsync(feedScheduleId);
                        if (existingFeedSchedule == null)
                        {
                            return new ResponseEntity<KoiFish>("No feed schedule found with such id");
                        }
                        else
                        {
                            if (count == 0) existingKoiFish.FeedSchedules.Clear();

                            existingKoiFish.FeedSchedules.Add(existingFeedSchedule);
                            if(!updateFeedId(feedScheduleId, existingKoiFish.KoiId)) return new ResponseEntity<KoiFish>("Something wrong while trying to assign a new koi for a schedule"); 

                            count++;
                        }
                    }
                }

                await _context.SaveChangesAsync();
                return new ResponseEntity<KoiFish>(existingKoiFish);
            }
            catch (Exception ex)
            {
                return new ResponseEntity<KoiFish>(ex.Message);
            }
        }

        public async Task<ResponseEntity<bool>> Delete(int id)
        {
            try
            {
                var koiFish = await _context.KoiFishes.FindAsync(id);
                if (koiFish == null)
                {
                    return new ResponseEntity<bool>("Koi Fish not found");
                }
                _context.KoiFishes.Remove(koiFish);
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


