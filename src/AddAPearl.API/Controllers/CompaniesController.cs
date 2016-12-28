using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Core;
using AddAPearl.Domain;
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
        public IEnumerable<ICompany> All()
        {
            _logger.LogInformation("Returning all the companies");
            return _addAPearlService.GetCompanies();
        }

        [HttpGet("{id}")]
        public IActionResult Id(int id)
        {
            var item = _addAPearlService.GetCompanyById(id);
            if (item == null)
                return NotFound();

            return new ObjectResult(item);
        }

        [HttpPost]
        [ActionName("Company")]
        public IActionResult AddCompany([FromBody] Company company)
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
    }
}
