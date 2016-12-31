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
    public class ItemsController : Controller
    {
        private static IAddAPearlService _addAPearlService;
        private readonly ILogger _logger;

        public ItemsController(IAddAPearlService addAPearlService, ILogger<ItemsController> logger)
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
                _logger.LogInformation("Returning all the items");
                var items = _addAPearlService.GetItems();
                return Ok(items);
            }
            catch (Exception objEx)
            {
                _logger.LogError("Items Exception!", objEx);
                return BadRequest(objEx);
            }
        }
    }
}
