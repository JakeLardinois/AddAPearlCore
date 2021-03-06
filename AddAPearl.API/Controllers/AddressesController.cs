﻿using System;
using System.Threading.Tasks;
using AddAPearl.Domain;
using AddAPearl.Services;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
        public async Task<IActionResult> GetAll()
        {
            try
            {
                _logger.LogInformation("Returning all the addresses");
                var addresses = await _addAPearlService.GetAddresses();
                return Ok(addresses);
            }
            catch (Exception objEx)
            {
                _logger.LogError("Addresses Exception!", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpGet("{id}")]
        [ActionName("Address")]
        public IActionResult GetById(int id)
        {
            try
            {
                var address = _addAPearlService.GetAddressById(id);
                if (address == null)
                    return NotFound();

                return Ok(address);
            }
            catch (Exception objEx)
            {
                _logger.LogError("Address Exception!", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpPost]
        [ActionName("Address")]
        public IActionResult Add([FromBody] Address address)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A ModelState validation Error Occurred...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }
                var newAddress = _addAPearlService.AddAddress(address);

                return Ok(newAddress);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An Add Address Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpPatch("{id}")]
        [ActionName("Address")]
        public IActionResult Update(int id, [FromBody] JsonPatchDocument<Address> patch)
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
                return Ok(address);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An UpdateAddress Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpDelete("{id}")]
        [ActionName("Address")]
        public IActionResult DeleteById(int id)
        {
            try
            {
                var address = _addAPearlService.GetAddressById(id);
                if (address == null)
                    return NotFound();

                var affectedRecords = _addAPearlService.DeleteAddress(address);
                if (affectedRecords > 0)
                    return Ok(address);

                return NoContent();
            }
            catch (Exception objEx)
            {
                _logger.LogError("An Address Deletion Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }
    }
}
