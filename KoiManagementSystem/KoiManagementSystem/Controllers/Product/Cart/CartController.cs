using BusinessLayer.Entities;
using BusinessLayer.Session;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Interface;

namespace KoiManagementSystem.Controllers.Product.Cart
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : Controller
    {
        private readonly ICartSerivce _cartSession;

        public CartController(ICartSerivce cartSession)
        {
            _cartSession = cartSession;
        }

        [HttpPost("add-to-cart")]
        public async Task<ActionResult> AddToCart(int userId,int productId, int quantity)
        {
           var result = await _cartSession.AddToCart(userId, productId, quantity);
           return Ok(result);
        }
        [HttpGet("get-cart")]
        public async Task<IActionResult> GetCart(int userId)
        {
            var cart = await _cartSession.GetCartByUserId(userId);
            return Ok(cart);
        }
        [HttpDelete("remove-cart")]
        public async Task<ActionResult<bool>> RemoveCart(int userId)
        {
            bool result = await _cartSession.RemoveCart(userId);
            return Ok(result); 
        }
        [HttpDelete("delete-product")]
        public async Task<ActionResult<bool>> DeleteCart(int userID, int productId)
        {
            bool result = await _cartSession.DeleteCartByProductID(userID, productId);
            return Ok(result);
        }
    }
}
