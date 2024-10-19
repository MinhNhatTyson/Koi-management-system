
using BusinessLayer.Entities;
using BusinessLayer.Request;
using BusinessLayer.Response;
using BusinessLayer.Session;
using RepositoryLayer.Interface;
using RepositoryLayer.Repository;

namespace KoiManagementSystem.Controllers.Product.Order
{
    public class OrderService : IOrderService
    {
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IProductRepository _productRepository;

        public OrderService(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor, IOrderRepository orderRepository, IOrderItemRepository orderItemRepository, IProductRepository productRepository)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
            _orderRepository = orderRepository;
            _orderItemRepository = orderItemRepository;
            _productRepository = productRepository;
        }

        public async Task<OrderResponse> ConvertCartToOrder(int userId, OrderRequest orderRequest)
        {
            User user = await _userRepository.GetUserById(userId);
            if (user == null)
            {
                return null;
            }

            var session = _httpContextAccessor.HttpContext.Session;
            List<CartSession> cart = session.GetObjectFromJson<List<CartSession>>($"Cart_{userId}") ?? new List<CartSession>();

            if (cart == null || !cart.Any())
            {
                return null;
            }
            var order = new BusinessLayer.Entities.Order
            {
                User = user,
                OrderDate = DateTime.UtcNow,
                TotalPrice = cart.Sum(p => p.Price),
                Address = orderRequest.Address,
                Phone = orderRequest.Phone,
                /*OrderItems = new List<BusinessLayer.Entities.OrderItem>(),
                */
            };
            await _orderRepository.AddOrder(order);

            foreach (var cartItem in cart)
            {
                BusinessLayer.Entities.Product product = await _productRepository.GetProduct(cartItem.ProductId);
                var orderItem = new BusinessLayer.Entities.OrderItem
                {
                    Order = order,
                    ProductId = cartItem.ProductId,
                    UnitPrice = cartItem.Price,
                    Quantity = cartItem.StockQuantity,
                };
                await _orderItemRepository.AddOrderItem(orderItem);
            }
            session.Remove($"Cart_{userId}");
            var orderItems = await _orderItemRepository.GetOrderItemsByOrderId(order.OrderId);

            return new OrderResponse
            {
                OrderId = order.OrderId,
                UserId = userId,
                OrderDate = order.OrderDate,
                TotalPrice = order.TotalPrice,
                Address = order.Address,
                Phone = order.Phone,
                OrderItems = orderItems.Select(oi => new OrderItermReponse
                {
                    ProductId = oi.ProductId,
                    ProductName = oi.Product.ProductName,
                    Quantity = oi.Quantity.Value,
                    UnitPrice = oi.UnitPrice.Value
                }).ToList()
            };
        }

        public async Task<List<OrderResponse>> HistoryOrderByUser(int userId)
        {
            var orders = await _orderRepository.GetOrderByUserId(userId);

            if (orders == null || !orders.Any())
            {
                return null;
            }
            var orderResponses = new List<OrderResponse>();
            foreach (var order in orders)
            {
                var orderItems = await _orderItemRepository.GetOrderItemsByOrderId(order.OrderId);
                var orderResponse = new OrderResponse
                {
                    OrderId = order.OrderId,
                    UserId = order.UserId,
                    OrderDate = order.OrderDate,
                    TotalPrice = order.TotalPrice,
                    Address = order.Address,
                    Phone = order.Phone,
                    OrderItems = orderItems.Select(oi => new OrderItermReponse
                    {
                        ProductId = oi.ProductId,
                        ProductName = oi.Product != null ? oi.Product.ProductName : string.Empty, 
                        Quantity = oi.Quantity.HasValue ? oi.Quantity.Value : 0, 
                        UnitPrice = oi.UnitPrice.HasValue ? oi.UnitPrice.Value : 0
                    }).ToList()
                };

                orderResponses.Add(orderResponse);
            }
            return orderResponses;
        }
    }
 }

