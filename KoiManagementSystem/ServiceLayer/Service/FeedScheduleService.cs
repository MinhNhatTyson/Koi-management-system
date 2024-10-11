using BusinessLayer.Entities;
using BusinessLayer.Request;
using BusinessLayer.Response;
using BusinessLayer.Validator;
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
    public class FeedScheduleService : IFeedScheduleService
    {
        private readonly IFeedScheduleRepository _feedScheduleRepository;

        public FeedScheduleService(IFeedScheduleRepository feedScheduleRepository)
        {
            _feedScheduleRepository = feedScheduleRepository;
        }

        public async Task<ResponseEntity<List<FeedSchedule>>> GetAll()
        {
            return await _feedScheduleRepository.GetAll();
        }

        public async Task<ResponseEntity<FeedSchedule>> GetById(int id)
        {
            if (id <= 0)
            {
                return new ResponseEntity<FeedSchedule>("Invalid Feed Schedule ID");
            }

            return await _feedScheduleRepository.GetById(id);
        }

        public async Task<ResponseEntity<FeedSchedule>> Create(FeedScheduleRequestDTO feedScheduleRequestDTO)
        {
            var validator = new FeedScheduleRequestDTOValidator();
            var validationResult = await validator.ValidateAsync(feedScheduleRequestDTO);

            if (!validationResult.IsValid)
            {
                var errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
                return new ResponseEntity<FeedSchedule>(string.Join(", ", errors));
            }

            return await _feedScheduleRepository.Create(feedScheduleRequestDTO);
        }

        public async Task<ResponseEntity<FeedSchedule>> Update(int id, FeedScheduleRequestDTO feedSchedule)
        {
            if (id <= 0)
            {
                return new ResponseEntity<FeedSchedule>("Invalid Feed Schedule ID");
            }

            if (feedSchedule == null)
            {
                return new ResponseEntity<FeedSchedule>("Invalid Feed Schedule request");
            }

            if (feedSchedule.KoiId <= 0)
            {
                return new ResponseEntity<FeedSchedule>("Invalid Koi ID");
            }

            if (feedSchedule.FeedDate == null)
            {
                return new ResponseEntity<FeedSchedule>("Feed date is required");
            }
            return await _feedScheduleRepository.Update(id, feedSchedule);
        }

        public async Task<ResponseEntity<bool>> Delete(int id)
        {
            if (id <= 0)
            {
                return new ResponseEntity<bool>("Invalid Feed Schedule ID");
            }

            return await _feedScheduleRepository.Delete(id);
        }
    }
}

