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

namespace AddAPearl.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class CompaniesController : Controller
    {
        private static IAddAPearlService _addAPearlService;
        private readonly ILogger _logger;

        public CompaniesController(IAddAPearlService addAPearlService, ILogger<CompaniesController> logger)
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
                _logger.LogInformation("Returning all the companies");
                var companies = _addAPearlService.GetCompanies();
                return Ok(companies);
            }
            catch (Exception objEx)
            {
                _logger.LogError("Companies Exception!", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpGet("{id}")]
        [ActionName("Company")]
        public IActionResult GetById(int id)
        {
            try
            {
                var item = _addAPearlService.GetCompanyById(id);
                if (item == null)
                    return NotFound();

                return Ok(item);
            }
            catch (Exception objEx)
            {
                _logger.LogError("Company Exception!", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpPost]
        [ActionName("Company")]
        public IActionResult Add([FromBody] Company company)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A ModelState validation Error Occurred...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }
                var newCompany = _addAPearlService.AddCompany(company);

                return Ok(newCompany);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An AddCompany Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpPatch("{id}")]
        [ActionName("Company")]
        public IActionResult Update(int id, [FromBody] JsonPatchDocument<ICompany> patch)
        {
            try
            {
                var company = _addAPearlService.GetCompanyById(id);
                if (company == null)
                {
                    _logger.LogWarning($"Company with Id {id} was not found...");
                    return NotFound($"Customer with Id {id} was not found...");
                }

                patch.ApplyTo(company, ModelState); //Populates ModelState with any patch errors (ie replacing a property that does not exist)
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A Patching Operation Errored Against the ModelState...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }

                TryValidateModel(company); //Populates ModelState with any validation errors for the Address Model 
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A ModelState validation Error Occurred...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }

                company = _addAPearlService.UpdateCompany(company);
                return Ok(company);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An Company Update Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpDelete("{id}")]
        [ActionName("Company")]
        public IActionResult DeleteById(int id)
        {
            try
            {
                var company = _addAPearlService.GetCompanyById(id);
                if (company == null)
                    return NotFound();

                var affectedRecords = _addAPearlService.DeleteCompany(company);
                if (affectedRecords > 0)
                    return Ok(company);
                else
                    return NoContent();

            }
            catch (Exception objEx)
            {
                _logger.LogError("An Company Deletion Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }
    }
}
