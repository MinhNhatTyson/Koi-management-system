﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Response
{
    public class OrderItermReponse
    {
        public int? ProductId { get; set; }
        public string ProductName { get; set; }

        public int? Quantity { get; set; }

        public decimal? UnitPrice { get; set; }
    }
}
