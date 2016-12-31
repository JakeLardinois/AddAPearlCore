using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Core;
using AddAPearl.Domain;
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
        public IActionResult GetAll()
        {
            try
            {
                _logger.LogInformation("Returning all the products");
                var products = _addAPearlService.GetProducts();
                return Ok(products);
            }
            catch (Exception objEx)
            {
                _logger.LogError("Products Exception!", objEx);
                return BadRequest(objEx);
            }
        }
    }
}
