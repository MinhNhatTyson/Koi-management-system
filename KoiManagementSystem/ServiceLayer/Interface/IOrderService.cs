using BusinessLayer.Request;
using BusinessLayer.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Interface
{
    public interface IOrderSerivce
    {
        Task<List<OrderResponse>> GetAllOrder();
        Task<OrderResponse> GetOrderById(int orderId);
        Task<OrderRequest> CreateOrder(OrderRequest orderRequest);  
        Task<OrderResponse> UpdateOrder(OrderResponse orderResponse);
        Task<OrderResponse> DeleteOrder(int orderId);
    }
}
