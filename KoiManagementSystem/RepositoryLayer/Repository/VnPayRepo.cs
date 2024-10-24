using BusinessLayer;
using BusinessLayer.Entities;
using RepositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository
{
    public class VnPayRepo : IVnPayRepo
    {
        private readonly KoiCareContext _context;

        public VnPayRepo(KoiCareContext context)
        {
            _context = context;
        }

        public async Task<Order> GetOrderByIdAsync(int orderId)
        {
            return await _context.Orders.FindAsync(orderId);
        }
    }
}
