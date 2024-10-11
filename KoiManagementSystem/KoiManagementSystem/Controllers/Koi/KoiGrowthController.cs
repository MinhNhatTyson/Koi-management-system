using BusinessLayer.Entities;
using BusinessLayer.Request;
using BusinessLayer.Response;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Interface;

namespace KoiManagementSystem.Controllers.Koi
{
    [ApiController]
    [Route("api/[controller]")]
    public class KoiGrowthController : Controller
    {
        private readonly IKoiGrowthService _koiGrowthService;

        public KoiGrowthController(IKoiGrowthService koiGrowthService)
        {
            _koiGrowthService = koiGrowthService;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseEntity<List<KoiGrowth>>>> GetAllKoiGrowthPlan()
        {
            var response = await _koiGrowthService.GetAll();
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
        public async Task<ActionResult<ResponseEntity<KoiGrowth>>> GetKoiGrowthById(int id)
        {
            var response = await _koiGrowthService.GetById(id);
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
        public async Task<ActionResult<ResponseEntity<KoiGrowth>>> CreateANewGrowthPlan(KoiGrowthRequestDTO koiGrowthRequestDTO)
        {
            return await _koiGrowthService.Create(koiGrowthRequestDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ResponseEntity<KoiGrowth>>> UpdateGrowthPlan(int id, KoiGrowthRequestDTO koiGrowth)
        {
            return await _koiGrowthService.Update(id, koiGrowth);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ResponseEntity<bool>>> DeleteGrowthPlan(int id)
        {
            return await _koiGrowthService.Delete(id);
        }
    }
}
