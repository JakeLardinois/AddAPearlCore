using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Reflection;
using AddAPearl.Core;
using Microsoft.AspNetCore.Mvc;

namespace AddAPearl.API.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private static IAddAPearlService _addAPearlService;

        public ValuesController(IAddAPearlService addAPearlService)
        {
            _addAPearlService = addAPearlService;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<ICompany> Get()
        {
            return _addAPearlService.GetCompanies();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
