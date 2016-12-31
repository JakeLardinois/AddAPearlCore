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
    public class CompaniesController: Controller
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
        public IEnumerable<ICompany> GetAll()
        {
            _logger.LogInformation("Returning all the companies");
            return _addAPearlService.GetCompanies();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var item = _addAPearlService.GetCompanyById(id);
            if (item == null)
                return NotFound();

            return new ObjectResult(item);
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

                return new ObjectResult(newCompany);
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
                    return NotFound($"Address with Id {id} was not found...");
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
                return new ObjectResult(company);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An Company Update Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }
    }
}
