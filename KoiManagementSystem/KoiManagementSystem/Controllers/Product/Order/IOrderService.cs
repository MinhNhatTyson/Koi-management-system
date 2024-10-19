using BusinessLayer.Entities;
using BusinessLayer.Request;
using BusinessLayer.Response;
using System.Threading.Tasks;

namespace KoiManagementSystem
{
    public interface IOrderService
    {
        Task<OrderResponse> ConvertCartToOrder(int userId, OrderRequest orderRequest);
        Task<List<OrderResponse>> HistoryOrderByUser(int userId);
    }
}
