using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Domain;
using AddAPearl.Services;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AddAPearl.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ProductsController : Controller
    {
        private static IAddAPearlService _addAPearlService;
        private readonly ILogger _logger;

        public ProductsController(IAddAPearlService addAPearlService, ILogger<ProductsController> logger)
        {
            _addAPearlService = addAPearlService;
            _logger = logger;
        }

        [HttpGet]
        [ActionName("")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                _logger.LogInformation("Returning all the products");
                var products = await _addAPearlService.GetProducts();
                return Ok(products);
            }
            catch (Exception objEx)
            {
                _logger.LogError("Products Exception!", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpGet("{id}")]
        [ActionName("Product")]
        public IActionResult GetById(int id)
        {
            try
            {
                var product = _addAPearlService.GetProductById(id);
                if (product == null)
                    return NotFound();

                return Ok(product);
            }
            catch (Exception objEx)
            {
                _logger.LogError("Product Exception!", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpPost]
        [ActionName("Product")]
        public IActionResult Add([FromBody] Product product)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A ModelState validation Error Occurred...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }
                var newProduct = _addAPearlService.AddProduct(product);

                return Ok(newProduct);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An AddProduct Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpPatch("{id}")]
        [ActionName("Product")]
        public IActionResult Update(int id, [FromBody] JsonPatchDocument<Product> patch)
        {
            try
            {
                var product = _addAPearlService.GetProductById(id);
                if (product == null)
                {
                    _logger.LogWarning($"Product with Id {id} was not found...");
                    return NotFound($"Product with Id {id} was not found...");
                }

                patch.ApplyTo(product, ModelState); //Populates ModelState with any patch errors (ie replacing a property that does not exist)
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A Patching Operation Errored Against the ModelState...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }

                TryValidateModel(product); //Populates ModelState with any validation errors for the Address Model 
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A ModelState validation Error Occurred...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }

                product = _addAPearlService.UpdateProduct(product);
                return Ok(product);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An Product Update Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpDelete("{id}")]
        [ActionName("Product")]
        public IActionResult DeleteById(int id)
        {
            try
            {
                var product = _addAPearlService.GetProductById(id);
                if (product == null)
                    return NotFound();

                var affectedRecords = _addAPearlService.DeleteProduct(product);
                if (affectedRecords > 0)
                    return Ok(product);

                return NoContent();
            }
            catch (Exception objEx)
            {
                _logger.LogError("An Product Deletion Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }
    }
}
