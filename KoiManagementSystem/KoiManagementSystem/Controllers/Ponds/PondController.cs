using BusinessLayer.Entities;
using BusinessLayer.Request;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Interface;

namespace KoiManagementSystem.Controllers.Ponds
{
    [Route("api/[controller]")]
    [ApiController]
    public class PondController : ControllerBase
    {
        private readonly IPondService _pondService;

        public PondController(IPondService pondService)
        {
            _pondService = pondService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Pond>>> GetAllPonds()
        {
            var ponds = await _pondService.GetAllPondsAsync();
            return Ok(ponds);
        }

        [HttpGet("ViewAPond/{id}")]
        public async Task<ActionResult<Pond>> GetPond(int id)
        {
            var pond = await _pondService.GetPondByIdAsync(id);
            if (pond == null)
            {
                return NotFound();
            }
            return Ok(pond);
        }

        [HttpPost("CreateNewPond")]
        public async Task<ActionResult<Pond>> CreatePond(CreatePondRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Create a new Pond instance from the request
            var pond = new Pond
            {
                PondName = request.PondName,
                Size = request.Size,
                Depth = request.Depth,
                Volume = request.Volume,
                WaterDischargeRate = request.WaterDischargeRate,
                PumpCapacity = request.PumpCapacity,
                UserId = request.UserId 
            };

            await _pondService.AddPondAsync(pond);
            return CreatedAtAction(nameof(GetPond), new { id = pond.PondId }, pond);
        }

        [HttpPut("UpdateAPond/{id}")]
        public async Task<IActionResult> UpdatePond(int id, UpdatePondRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pond = await _pondService.GetPondByIdAsync(id);
            if (pond == null)
            {
                return NotFound();
            }

            // Update only the fields that are allowed to be updated
            pond.PondName = request.PondName;
            pond.Size = request.Size;
            pond.Depth = request.Depth;
            pond.Volume = request.Volume;
            pond.WaterDischargeRate = request.WaterDischargeRate;
            pond.PumpCapacity = request.PumpCapacity;

            await _pondService.UpdatePondAsync(pond);
            return NoContent();
        }

        [HttpDelete("DeleteAPond/{id}")]
        public async Task<IActionResult> DeletePond(int id)
        {
            await _pondService.DeletePondAsync(id);
            return NoContent();
        }
    }
}
