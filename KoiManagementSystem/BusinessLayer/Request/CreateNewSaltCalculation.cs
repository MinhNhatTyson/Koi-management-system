using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Request
{
    public class CreateNewSaltCalculation
    {
        public int? PondId { get; set; }

        public DateTime? CalculationDate { get; set; }

        public decimal? SaltAmount { get; set; }

        public string? Notes { get; set; }
    }
}
