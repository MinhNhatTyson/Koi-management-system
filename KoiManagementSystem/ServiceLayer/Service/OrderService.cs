using BusinessLayer.Request;
using BusinessLayer.Response;
using ServiceLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Service
{
    public class OrderService : IOrderSerivce
    {
        public Task<OrderRequest> CreateOrder(OrderRequest orderRequest)
        {
            throw new NotImplementedException();
        }

        public Task<OrderResponse> DeleteOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<List<OrderResponse>> GetAllOrder()
        {
            throw new NotImplementedException();
        }

        public Task<OrderResponse> GetOrderById(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<OrderResponse> UpdateOrder(OrderResponse orderResponse)
        {
            throw new NotImplementedException();
        }
    }
}
