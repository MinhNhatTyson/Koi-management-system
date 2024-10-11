using BusinessLayer.Response;
using BusinessLayer.Request;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Entities;

namespace ServiceLayer.Interface
{
    public interface IProductService
    {
        Task<List<ProductResponse>> GetAllProduct();

        Task<Product> CreateProduct(ProductRequest productRequest);
    }
}
