using BusinessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interface
{
    public interface IOrderItemRepository
    {
        Task<OrderItem> AddOrderItem(OrderItem orderItem);
        Task<List<OrderItem>> GetOrderItemsByOrderId(int orderId);
    }
}
