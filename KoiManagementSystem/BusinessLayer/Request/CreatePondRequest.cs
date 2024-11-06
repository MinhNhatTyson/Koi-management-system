using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Request
{
    public class CreatePondRequest
    {
        [Required]
        [MaxLength(100)]
        public string PondName { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? Size { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? Depth { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? Volume { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? WaterDischargeRate { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? PumpCapacity { get; set; }

        public int? UserId { get; set; }
    }
}
