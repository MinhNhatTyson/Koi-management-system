using BusinessLayer.Entities;
using BusinessLayer.Request;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Interface;

namespace KoiManagementSystem.Controllers.Ponds
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaltCalculationController : ControllerBase
    {
        private readonly ISaltCalculationService _saltService;

        public SaltCalculationController(ISaltCalculationService waterService)
        {
            _saltService = waterService;
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<SaltCalculation>>> GetAll()
        {
            var saltCalculations = await _saltService.GetSaltCalculations();
            return Ok(saltCalculations);
        }

        [HttpGet("ViewASaltCalculation/{id}")]
        public async Task<ActionResult<Pond>> GetSaltCalculation(int id)
        {
            var saltCalculation = await _saltService.GetSaltCalculationById(id);
            if (saltCalculation == null)
            {
                return NotFound();
            }
            return Ok(saltCalculation);
        }

        [HttpPost("GenerateNewSaltCalculation")]
        public async Task<ActionResult<Pond>> CreateSaltCalculation(CreateNewSaltCalculation request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var salt = new SaltCalculation
            {
                CalculationDate = DateTime.Now,
                PondId = request.PondId,
                Notes = request.Notes,
                SaltAmount  = request.SaltAmount,
            };

            await _saltService.AddSaltCalculation(salt);
            return CreatedAtAction(nameof(GetSaltCalculation), new { id = salt.SaltId }, salt);
        }
    }
}
