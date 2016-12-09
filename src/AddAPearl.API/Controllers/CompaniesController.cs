using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Core;
using Microsoft.AspNetCore.Mvc;

namespace AddAPearl.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class CompaniesController: Controller
    {
        private static IAddAPearlService _addAPearlService;

        public CompaniesController(IAddAPearlService addAPearlService)
        {
            _addAPearlService = addAPearlService;
        }

        [HttpGet]
        [ActionName("")]
        public IEnumerable<ICompany> All()
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
