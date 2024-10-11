﻿using BusinessLayer.Entities;
using BusinessLayer.Request;
using BusinessLayer.Response;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Interface;

namespace KoiManagementSystem.Controllers.Koi
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedScheduleController : Controller
    {
        private readonly IFeedScheduleService feedScheduleService;

        public FeedScheduleController(IFeedScheduleService koiGrowthService)
        {
            feedScheduleService = koiGrowthService;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseEntity<List<KoiGrowth>>>> GetAllKoiFeedSchedule()
        {
            var response = await feedScheduleService.GetAll();
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response.ErrorMessage);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseEntity<KoiGrowth>>> GetFeedScheduleById(int id)
        {
            var response = await feedScheduleService.GetById(id);
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response.ErrorMessage);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ResponseEntity<FeedSchedule>>> CreateANewFeedSchedule(FeedScheduleRequestDTO FeedScheduleRequestDTO)
        {
            return await feedScheduleService.Create(FeedScheduleRequestDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ResponseEntity<FeedSchedule>>> UpdateAFeedSchedule(int id, FeedScheduleRequestDTO FeedSchedule)
        {
            return await feedScheduleService.Update(id, FeedSchedule);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ResponseEntity<bool>>> DeleteFeedSchedule(int id)
        {
            return await feedScheduleService.Delete(id);
        }
    }
}
