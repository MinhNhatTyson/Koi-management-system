using BusinessLayer.Session;

namespace KoiManagementSystem.Controllers.Product.Cart
{
    public interface ICartSerivce
    {
        Task<List<CartSession>> GetCartByUserId(int userId);
        Task<CartSession> AddToCart(int userId, int productId, int quantity);
        Task<bool> RemoveCart(int userId);   
        Task<bool> DeleteCartByProductID(int userId, int productId);
    }
}
