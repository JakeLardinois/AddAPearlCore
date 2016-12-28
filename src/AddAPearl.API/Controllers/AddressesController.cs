using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Core;
using AddAPearl.Domain;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AddAPearl.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AddressesController : Controller
    {
        private static IAddAPearlService _addAPearlService;
        private readonly ILogger _logger;

        public AddressesController(IAddAPearlService addAPearlService, ILogger<AddressesController> logger)
        {
            _addAPearlService = addAPearlService;
            _logger = logger;
        }

        [HttpGet]
        [ActionName("")]
        public IEnumerable<IAddress> All()
        {
            
            return _addAPearlService.GetAddresses();
        }

        [HttpGet("{id}")]
        [ActionName("Address")]
        public IActionResult Id(int id)
        {
            var address = _addAPearlService.GetAddressById(id);
            return new ObjectResult(address);
        }

        [HttpPatch("{id}")]
        [ActionName("Address")]
        public IActionResult UpdateAddress(int id, [FromBody] JsonPatchDocument<IAddress> patch)
        {
            try
            {
                var address = _addAPearlService.GetAddressById(id);
                if (address == null)
                {
                    _logger.LogWarning($"Address with Id {id} was not found...");
                    return NotFound($"Address with Id {id} was not found...");
                }

                patch.ApplyTo(address, ModelState); //Populates ModelState with any patch errors (ie replacing a property that does not exist)
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A Patching Operation Errored Against the ModelState...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }

                TryValidateModel(address); //Populates ModelState with any validation errors for the Address Model 
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A ModelState validation Error Occurred...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }

                address = _addAPearlService.UpdateAddress(address);
                return new ObjectResult(address);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An UpdateAddress Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }
    }
}
