using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using AddAPearl.Services;
using AddAPearl.Services.Models;

namespace AddAPearl.API.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private static AddAPearlService _addAPearlService;

        public ValuesController(AddAPearl.Entities.AddAPearlContext addAPearlContext)
        {
            _addAPearlService = new AddAPearlService(addAPearlContext);
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Company> Get()
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
