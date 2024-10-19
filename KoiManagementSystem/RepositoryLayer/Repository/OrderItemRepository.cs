using BusinessLayer;
using BusinessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository
{
    public class OrderItemRepository : IOrderItemRepository
    {

        private readonly KoiCareContext _context;

        public OrderItemRepository(KoiCareContext context)
        {
            _context = context;
        }

        public async Task<OrderItem> AddOrderItem(OrderItem orderItem)
        {
            _context.OrderItems.Add(orderItem);
            _context.SaveChanges();
            return orderItem;
        }

        public async Task<List<OrderItem>> GetOrderItemsByOrderId(int orderId)
        {
            return await _context.OrderItems
                .Where(oi => oi.OrderId == orderId)
                .ToListAsync();
        }
    }
}
