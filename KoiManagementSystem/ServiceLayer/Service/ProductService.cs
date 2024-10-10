using BusinessLayer.Entities;
using BusinessLayer.Request;
using BusinessLayer.Response;
using Microsoft.Extensions.Configuration;
using RepositoryLayer.Interface;
using ServiceLayer.Interface;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Service
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository productRepository;
        private IConfiguration configuration;

        public ProductService(IProductRepository productRepository, IConfiguration configuration)
        {
            this.productRepository = productRepository;
            this.configuration = configuration;
        }

        public async Task<Product> CreateProduct(ProductRequest productRequest)
        {
            Product product = new Product
            {

                ProductDescription = productRequest.ProductName,
                ProductName = productRequest.ProductName,
                Price = productRequest.Price,
                StockQuantity = productRequest.StockQuantity,   
            };
            var products = await productRepository.CreateProduct(product);
            return products;
        }

        public async Task<List<ProductResponse>> GetAllProduct()
        {
            return await productRepository.GetAllProduct();
        }
    }
}
