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
    public interface IFeedScheduleRepository
    {
        Task<ResponseEntity<List<FeedSchedule>>> GetAll();
        Task<ResponseEntity<FeedSchedule>> GetById(int id);
        Task<ResponseEntity<FeedSchedule>> Create(FeedScheduleRequestDTO feedScheduleRequestDTO);
        Task<ResponseEntity<FeedSchedule>> Update(int id, FeedScheduleRequestDTO feedSchedule);
        Task<ResponseEntity<bool>> Delete(int id);
    }
}
