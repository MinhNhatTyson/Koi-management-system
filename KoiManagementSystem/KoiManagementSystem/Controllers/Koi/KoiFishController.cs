using BusinessLayer.Entities;
using BusinessLayer.Request;
using BusinessLayer.Response;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Interface;
using ServiceLayer.Service;

namespace KoiManagementSystem.Controllers.Koi
{
    [ApiController]
    [Route("api/[controller]")]
    public class KoiFishController : Controller
    {
        private readonly IKoiFishService _koiFishService;

        public KoiFishController(IKoiFishService koiFishService)
        {
            _koiFishService = koiFishService;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseEntity<List<KoiFish>>>> GetAllKoiFish()
        {
            var response = await _koiFishService.GetAll();
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
        public async Task<ActionResult<ResponseEntity<KoiFish>>> GetKoiFishById(int id)
        {
            var response = await _koiFishService.GetById(id);
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
        public async Task<ActionResult<ResponseEntity<KoiFish>>> AddNewKoi(KoiFishRequestDTO koiFishRequestDTO)
        {
            return await _koiFishService.Create(koiFishRequestDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ResponseEntity<KoiFish>>> UpdateAFish(int id, KoiFishRequestDTO koiFish)
        {
            return await _koiFishService.Update(id, koiFish);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ResponseEntity<bool>>> DeleteAFish(int id)
        {
            return await _koiFishService.Delete(id);
        }
    }
}