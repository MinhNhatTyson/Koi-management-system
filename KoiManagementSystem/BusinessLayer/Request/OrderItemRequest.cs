using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Request
{
    public  class OrderItemRequest
    {
        public int? ProductId { get; set; }
        public string? ProductName { get; set; }
        public decimal? UnitPrice { get; set; }
        public string Image {  get; set; }
        public int? Quantity { get; set; }
    }
}
