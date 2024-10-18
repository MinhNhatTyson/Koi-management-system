using BusinessLayer.Entities;
using BusinessLayer.Entities;

using BusinessLayer.Session;
using KoiManagementSystem;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using RepositoryLayer.Interface;
using ServiceLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
 
namespace KoiManagementSystem.Controllers.Product.Cart
{
    public class CartService : ICartSerivce
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        private readonly IProductRepository _productRepository;
        private readonly IConfiguration _configuration;

        public CartService(IHttpContextAccessor httpContextAccessor, IUserRepository userRepository, IProductRepository productRepository, IConfiguration configuration)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
            _productRepository = productRepository;
            _configuration = configuration;
        }

        public async Task<List<CartSession>> GetCartByUserId(int userId)
        {
            var session = _httpContextAccessor.HttpContext.Session;
            var cart = session.GetObjectFromJson<List<CartSession>>($"Cart_{userId}") ?? new List<CartSession>();
            return await Task.FromResult(cart);
        }
        public async Task<CartSession> AddToCart(int userId, int productId ,int quantity)
        {
            User user =await _userRepository.GetUserById(userId);
            if (user == null) { return null; }
            var product = await _productRepository.GetProductById(productId);
            if(product== null) { return null; }
            var session = _httpContextAccessor.HttpContext.Session;
            List<CartSession> cart = session.GetObjectFromJson<List<CartSession>>($"Cart_{userId}") ?? new List<CartSession>();
            if (cart == null)
            {
                Console.WriteLine($"Cart is null for user {userId}"); 
            }
            else
            {
                Console.WriteLine($"Cart count: {cart.Count}"); 
            }

            var existingProduct = cart.FirstOrDefault(p => p.ProductId == productId);
            if (existingProduct != null)
            {
                existingProduct.StockQuantity += quantity;
            }
            else
            {
                cart.Add(new CartSession
                {
                    ProductId = productId,
                    ProductName = product.ProductName,
                    Price = product.Price* quantity,
                    StockQuantity = quantity,
                    ProductDescription = product.ProductDescription,
                    Image = product.Image,
                });
            }

            session.SetObjectAsJson($"Cart_{userId}", cart);
            return await Task.FromResult(cart.FirstOrDefault(p => p.ProductId == productId));
        }

        public async Task<bool> RemoveCart(int userId)
        {
            User user = await _userRepository.GetUserById(userId);
            if (user == null) { return false; }
            var session = _httpContextAccessor.HttpContext.Session;
            session.Remove($"Cart_{userId}");
            return true;
        }

        public async Task<bool> DeleteCartByProductID(int userId, int productId)
        {
            User user = await _userRepository.GetUserById(userId);
            if (user == null)
            {
                return false;
            }
            var session = _httpContextAccessor.HttpContext.Session;
            List<CartSession> cart = session.GetObjectFromJson<List<CartSession>>($"Cart_{userId}") ?? new List<CartSession>();
            if (cart == null || !cart.Any())
            {
                return false;
            }
            var productToRemove = cart.FirstOrDefault(p => p.ProductId == productId);
            if (productToRemove != null)
            {
                cart.Remove(productToRemove);
                session.SetObjectAsJson($"Cart_{userId}", cart);
                return true;
            }
            return false;
        }
    }
}
