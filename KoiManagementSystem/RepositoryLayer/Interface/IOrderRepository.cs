using BusinessLayer.Entities;
using BusinessLayer.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interface
{
    public interface IOrderRepository
    {
        Task<Order> AddOrder(Order order);

        Task<List<Order>> GetOrderByUserId(int userId);
    }
}
