using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Reflection;
using AddAPearl.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AddAPearl.API.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private static IAddAPearlService _addAPearlService;
        private readonly ILogger _logger;

        public ValuesController(IAddAPearlService addAPearlService, ILogger<ValuesController> logger)
        {
            _addAPearlService = addAPearlService;
            _logger = logger;
        }

        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogDebug("I'm Firing Dammit!!");
            try
            {
                var items = _addAPearlService
                    .GetCompanies();
                return new ObjectResult(items);
            }
            catch (Exception objEx)
            {
                _logger.LogError("Values Exception!", objEx);
                return new ObjectResult(objEx);
            }
            
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
