using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Services;
using AddAPearl.Services.Models;
using Microsoft.AspNetCore.Mvc;

namespace AddAPearl.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class CompaniesController: Controller
    {
        private static AddAPearlService _addAPearlService;

        public CompaniesController(Entities.AddAPearlContext addAPearlContext)
        {
            _addAPearlService = new AddAPearlService(addAPearlContext);
        }

        [HttpGet]
        [ActionName("")]
        public IEnumerable<Company> All()
        {
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
    }
}
