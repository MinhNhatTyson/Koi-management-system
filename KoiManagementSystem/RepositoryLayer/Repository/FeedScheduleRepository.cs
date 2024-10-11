using BusinessLayer.Entities;
using BusinessLayer.Request;
using BusinessLayer.Response;
using BusinessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Interface;

namespace RepositoryLayer.Repository
{
    public class FeedScheduleRepository : IFeedScheduleRepository
    {
        private readonly KoiCareContext _context;

        public FeedScheduleRepository(KoiCareContext context)
        {
            _context = context;
        }

        public async Task<ResponseEntity<List<FeedSchedule>>> GetAll()
        {
            try
            {
                var feedSchedules = await _context.FeedSchedules
                                        .Include(fs => fs.Koi)
                                        .ToListAsync();
                return new ResponseEntity<List<FeedSchedule>>(feedSchedules);
            }
            catch (Exception ex)
            {
                return new ResponseEntity<List<FeedSchedule>>(ex.Message);
            }
        }

        public async Task<ResponseEntity<FeedSchedule>> GetById(int id)
        {
            try
            {
                var feedSchedule = await _context.FeedSchedules
                                        .Include(fs => fs.Koi)
                                        .FirstOrDefaultAsync(fs => fs.FeedId == id);
                if (feedSchedule == null)
                {
                    return new ResponseEntity<FeedSchedule>("Feed Schedule not found");
                }
                return new ResponseEntity<FeedSchedule>(feedSchedule);
            }
            catch (Exception ex)
            {
                return new ResponseEntity<FeedSchedule>(ex.Message);
            }
        }

        public async Task<ResponseEntity<FeedSchedule>> Create(FeedScheduleRequestDTO feedScheduleRequestDTO)
        {
            try
            {
                var FeedSchedule = new FeedSchedule
                {
                    FeedDate = feedScheduleRequestDTO.FeedDate,
                    FeedAmount = feedScheduleRequestDTO.FeedAmount,
                    Notes = feedScheduleRequestDTO.Notes,
                };
                _context.FeedSchedules.Add(FeedSchedule);
                await _context.SaveChangesAsync();
                return new ResponseEntity<FeedSchedule>(FeedSchedule);
            }
            catch (Exception ex)
            {
                return new ResponseEntity<FeedSchedule>(ex.Message);
            }
        }

        public async Task<ResponseEntity<FeedSchedule>> Update(int id, FeedScheduleRequestDTO feedSchedule)
        {
            try
            {
                var existingFeedSchedule = await _context.FeedSchedules.FindAsync(id);
                if (existingFeedSchedule == null)
                {
                    return new ResponseEntity<FeedSchedule>("Feed Schedule not found");
                }

                var koi = await _context.KoiFishes.FindAsync(feedSchedule.KoiId);
                if(koi == null) return new ResponseEntity<FeedSchedule>("No Koi found with such id!!");

                existingFeedSchedule.KoiId = feedSchedule.KoiId;
                existingFeedSchedule.FeedDate = feedSchedule.FeedDate;
                existingFeedSchedule.FeedAmount = feedSchedule.FeedAmount;
                existingFeedSchedule.Notes = feedSchedule.Notes;
                await _context.SaveChangesAsync();
                return new ResponseEntity<FeedSchedule>(existingFeedSchedule);
            }
            catch (Exception ex)
            {
                return new ResponseEntity<FeedSchedule>(ex.Message);
            }
        }

        public bool UpdateFeedId(int id, int KoiId)
        {
            try
            {
                FeedSchedule existingKoiGrowth = _context.FeedSchedules.FindAsync(id).Result;
                if (existingKoiGrowth == null)
                {
                    return false;
                }
                var koi = _context.KoiFishes.FindAsync(KoiId).Result;
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
                var FeedSchedule = await _context.FeedSchedules.FindAsync(id);
                if (FeedSchedule == null)
                {
                    return new ResponseEntity<bool>("Koi Growth not found");
                }
                _context.FeedSchedules.Remove(FeedSchedule);
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

