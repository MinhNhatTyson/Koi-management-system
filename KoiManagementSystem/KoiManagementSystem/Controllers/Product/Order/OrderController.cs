using BusinessLayer.Request;
using BusinessLayer.Response;
using Microsoft.AspNetCore.Mvc;

namespace KoiManagementSystem.Controllers.Product.Order
{
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("convert-cart-to-order")]
        public async Task<ActionResult> ConvertCartToOrder(int userId, OrderRequest orderRequest)
        {
            var result = await _orderService.ConvertCartToOrder(userId, orderRequest);
            return Ok(result);
        }
        [HttpGet("get-hisory")]
        public async Task<ActionResult> HistoryOrder(int userId)
        {
            var result = await _orderService.HistoryOrderByUser(userId);    
            return Ok(result);
        }
    }
}
