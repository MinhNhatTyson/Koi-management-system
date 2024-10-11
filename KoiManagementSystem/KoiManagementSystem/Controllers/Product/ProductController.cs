using BusinessLayer.Request;
using BusinessLayer.Response;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Interface;
using ServiceLayer.Service;

namespace KoiManagementSystem.Controllers.Product
{

    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService productService;

        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }

        [HttpGet("get-all-product")]
        public async Task<ActionResult<List<ProductResponse>>> GetAllProducts()
        {
            var products = await productService.GetAllProduct();

            if (products == null || !products.Any())
            {
                return NotFound("No products found.");
            }

            return Ok(products);
        }

        [HttpPost("create-product")]
        public async Task<ActionResult> CreateProduct(ProductRequest productRequest)
        {
            var products = await productService.CreateProduct(productRequest);
            return Ok(products);
        }
    }
 }

