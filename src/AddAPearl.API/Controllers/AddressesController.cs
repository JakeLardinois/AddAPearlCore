using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Core;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AddAPearl.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AddressesController : Controller
    {
        private static IAddAPearlService _addAPearlService;

        public AddressesController(IAddAPearlService addAPearlService)
        {
            _addAPearlService = addAPearlService;
        }

        [HttpGet]
        [ActionName("")]
        public IEnumerable<IAddress> All()
        {
            return _addAPearlService.GetAddresses();
        }

        [HttpGet("{id}")]
        [ActionName("Address")]
        public IActionResult Id(int id)
        {
            var address = _addAPearlService.GetAddressById(id);
            return new ObjectResult(address);
        }

        [HttpPatch("{id}")]
        [ActionName("Address")]
        public IActionResult Id(int id, [FromBody] dynamic jsonData)
        {
            var address = _addAPearlService.GetAddressById(id);
            return new ObjectResult(address);

            //try
            //{
            //    //JObject jObject = JObject.Parse(jsonData.ToString());
            //    var strAddress = jsonData.Address.ToString();
            //    var selectedFranchise = JsonConvert.DeserializeObject<IAddress>(strAddress);

            //    var address = _addAPearlService.GetAddressById(id);
            //    return new ObjectResult(address);
            //}
            //catch (Exception objEx)
            //{
                
            //    throw objEx;
            //}
        }
    }
}
