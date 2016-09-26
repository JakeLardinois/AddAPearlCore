using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Reflection;
using AddAPearl.Entities;
using Microsoft.AspNetCore.Mvc;
using AddAPearl.Services;

namespace AddAPearl.API.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private static AddAPearlService _addAPearlService;

        public ValuesController()
        {
            _addAPearlService = new AddAPearlService();
        }

        // GET api/values
        [HttpGet]
        public IList<Company> Get()
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
