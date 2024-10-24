using BusinessLayer;
using BusinessLayer.Entities;
using BusinessLayer.Request;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly KoiCareContext _context;

        public OrderRepository(KoiCareContext context)
        {
            _context = context;
        }

   

        public async Task<Order> AddOrder(Order Order)
        {
  
            _context.Orders.Add(Order);
            _context.SaveChanges();
            return Order;
        }

        public async Task<List<Order>> GetOrderByUserId(int userId)
        {
            return await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems) 
                .ToListAsync();
        }
    }
}
