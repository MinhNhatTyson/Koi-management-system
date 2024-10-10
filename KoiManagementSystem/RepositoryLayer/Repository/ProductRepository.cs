using BusinessLayer;
using BusinessLayer.Entities;
using BusinessLayer.Response;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly KoiCareContext _context;

        public ProductRepository(KoiCareContext context)
        {
            _context = context;
        }

        public async Task<Product> CreateProduct(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return product;
        }

        public async Task<List<ProductResponse>> GetAllProduct()
        {
            var product = await _context.Products.Select(
                p => new ProductResponse
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    ProductDescription = p.ProductDescription,
                    Price  = p.Price,
                    StockQuantity = p.StockQuantity                   
                }).ToListAsync();
            return product;
        }
       

        public Task<ProductResponse> GetProductById(int productId)
        {
            throw new NotImplementedException();
        }
    }
}
