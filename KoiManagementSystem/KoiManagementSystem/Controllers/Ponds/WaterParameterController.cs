using BusinessLayer.Entities;
using BusinessLayer.Request;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Interface;
using ServiceLayer.Service;

namespace KoiManagementSystem.Controllers.waterParams
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterParameterController : ControllerBase
    {
        private readonly IWaterParameterService _waterService;

        public WaterParameterController(IWaterParameterService waterService)
        {
            _waterService = waterService;
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<WaterParameter>>> GetAllWaterParams()
        {
            var waterParams = await _waterService.GetAllPondsAsync();
            return Ok(waterParams);
        }

        [HttpGet("ViewAWaterParamInDetail/{id}")]
        public async Task<ActionResult<Pond>> GetWaterParam(int id)
        {
            var waterParameter = await _waterService.GetWaterParameterByIdAsync(id);
            if (waterParameter == null)
            {
                return NotFound();
            }
            return Ok(waterParameter);
        }

        [HttpPost("GenerateNewWaterParam")]
        public async Task<ActionResult<Pond>> CreateWaterParam(CreateNewWaterParamRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var water = new WaterParameter
            {
                MeasurementDate = DateTime.Now,
                PondId = request.PondId,
                No2 = request.No2,
                No3 = request.No3,
                Oxygen = request.Oxygen,
                PH = request.PH,
                Po4 = request.Po4,
                Salinity = request.Salinity,
                Temperature = request.Temperature,
            };

            await _waterService.AddWaterParameterAsync(water);
            return CreatedAtAction(nameof(GetWaterParam), new { id = water.ParameterId }, water);
        }
        
    }
}
