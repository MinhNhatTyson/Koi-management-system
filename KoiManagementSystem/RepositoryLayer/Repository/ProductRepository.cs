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

        public async Task<Product> DeleteProduct(int productID)
        {
            Product product = await _context.Products.FirstOrDefaultAsync(n => n.ProductId == productID);
            if (product == null)
            {
                return null;
            }
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
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
                    StockQuantity = p.StockQuantity,  
                    Image = p.Image
                }).ToListAsync();
            return product;
        }
       

        public async Task<ProductResponse> GetProductById(int productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(n => n.ProductId == productId);
            if (product == null)
            {
                return null; 
            }
            var productResponse = new ProductResponse
            {
                ProductId = productId,
                Image = product.Image,
                ProductName = product.ProductName,
                StockQuantity = product.StockQuantity,
                Price = product.Price,
                ProductDescription = product.ProductDescription
            };
            return productResponse;
        }

        public async Task<ProductResponse> UpdateProduct(ProductResponse productResponse)
        {
            var product = await _context.Products.FindAsync(productResponse.ProductId);
            if (product == null)
            {
                return null;
            }
            product.ProductName = productResponse.ProductName;  
            product.ProductDescription = productResponse.ProductDescription;
            product.Price = productResponse.Price;
            product.StockQuantity = productResponse.StockQuantity;
            product.Image = productResponse.Image;
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return productResponse;
        }


    }
}
