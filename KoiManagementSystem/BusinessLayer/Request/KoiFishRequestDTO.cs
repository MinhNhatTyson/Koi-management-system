using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Request
{
    public class KoiFishRequestDTO
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public int? Age { get; set; }
        public decimal? Size { get; set; }
        public decimal? Weight { get; set; }
        public string Gender { get; set; }
        public string Breed { get; set; }
        public string Origin { get; set; }
        public decimal? Price { get; set; }
        public int? PondId { get; set; }
        public List<int> KoiGrowthIds { get; set; }
        public List<int> FeedScheduleIds { get; set; }

    }
}
