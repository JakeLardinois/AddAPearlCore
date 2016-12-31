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
    public class CustomersController : Controller
    {
        private static IAddAPearlService _addAPearlService;
        private readonly ILogger _logger;

        public CustomersController(IAddAPearlService addAPearlService, ILogger<CustomersController> logger)
        {
            _addAPearlService = addAPearlService;
            _logger = logger;
        }

        [HttpGet]
        [ActionName("")]
        public IActionResult GetAll()
        {
            _logger.LogInformation("Returning all the customers");
            var customers = _addAPearlService.GetCustomers();
            return new ObjectResult(customers);
        }
    }
}
