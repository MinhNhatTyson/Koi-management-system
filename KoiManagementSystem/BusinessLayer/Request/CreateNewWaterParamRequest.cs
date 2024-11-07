using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Request
{
    public class CreateNewWaterParamRequest
    {
        public int? PondId { get; set; }

        public DateTime? MeasurementDate { get; set; }

        public decimal? Temperature { get; set; }

        public decimal? Salinity { get; set; }

        public decimal? PH { get; set; }

        public decimal? Oxygen { get; set; }

        public decimal? No2 { get; set; }

        public decimal? No3 { get; set; }

        public decimal? Po4 { get; set; }
    }
}
