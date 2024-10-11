using BusinessLayer.Entities;
using BusinessLayer.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interface
{
    public interface IProductRepository
    {
        Task<Product> CreateProduct(Product product);
        Task<List<ProductResponse>> GetAllProduct();
        Task<ProductResponse> GetProductById(int productId);

        

    }
}
