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
        public async Task<IActionResult> GetAll()
        {
            try
            {
                _logger.LogInformation("Returning all the customers");
                var customers = await _addAPearlService.GetCustomers();
                return Ok(customers);
            }
            catch (Exception objEx)
            {
                _logger.LogError("Customers Exception!", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpGet("{id}")]
        [ActionName("Customer")]
        public IActionResult GetById(int id)
        {
            try
            {
                var customer = _addAPearlService.GetCustomerById(id);
                if (customer == null)
                    return NotFound();

                return Ok(customer);
            }
            catch (Exception objEx)
            {
                _logger.LogError("Customer Exception!", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpPost]
        [ActionName("Customer")]
        public IActionResult Add([FromBody] Customer customer)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A ModelState validation Error Occurred...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }
                var newCustomer = _addAPearlService.AddCustomer(customer);

                return Ok(newCustomer);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An AddCustomer Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpPatch("{id}")]
        [ActionName("Customer")]
        public IActionResult Update(int id, [FromBody] JsonPatchDocument<ICustomer> patch)
        {
            try
            {
                var customer = _addAPearlService.GetCustomerById(id);
                if (customer == null)
                {
                    _logger.LogWarning($"Customer with Id {id} was not found...");
                    return NotFound($"Customer with Id {id} was not found...");
                }

                patch.ApplyTo(customer, ModelState); //Populates ModelState with any patch errors (ie replacing a property that does not exist)
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A Patching Operation Errored Against the ModelState...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }

                TryValidateModel(customer); //Populates ModelState with any validation errors for the Address Model 
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A ModelState validation Error Occurred...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }

                customer = _addAPearlService.UpdateCustomer(customer);
                return Ok(customer);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An Customer Update Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpDelete("{id}")]
        [ActionName("Customer")]
        public IActionResult DeleteById(int id)
        {
            try
            {
                var customer = _addAPearlService.GetCustomerById(id);
                if (customer == null)
                    return NotFound();

                var affectedRecords = _addAPearlService.DeleteCustomer(customer);
                if (affectedRecords > 0)
                    return Ok(customer);

                return NoContent();

            }
            catch (Exception objEx)
            {
                _logger.LogError("An Customer Deletion Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }
    }
}
