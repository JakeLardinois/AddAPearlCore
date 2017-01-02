using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Core;
using AddAPearl.Domain;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AddAPearl.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ItemsController : Controller
    {
        private static IAddAPearlService _addAPearlService;
        private readonly ILogger _logger;

        public ItemsController(IAddAPearlService addAPearlService, ILogger<ItemsController> logger)
        {
            _addAPearlService = addAPearlService;
            _logger = logger;
        }

        [HttpGet]
        [ActionName("")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                _logger.LogInformation("Returning all the items");
                var items = await _addAPearlService.GetItems();
                return Ok(items);
            }
            catch (Exception objEx)
            {
                _logger.LogError("Items Exception!", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpGet("{id}")]
        [ActionName("Item")]
        public IActionResult GetById(int id)
        {
            try
            {
                var item = _addAPearlService.GetItemById(id);
                if (item == null)
                    return NotFound();

                return Ok(item);
            }
            catch (Exception objEx)
            {
                _logger.LogError("Item Exception!", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpPost]
        [ActionName("Item")]
        public IActionResult Add([FromBody] Item item)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A ModelState validation Error Occurred...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }
                var newItem = _addAPearlService.AddItem(item);

                return Ok(newItem);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An AddItem Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpPatch("{id}")]
        [ActionName("Item")]
        public IActionResult Update(int id, [FromBody] JsonPatchDocument<IItem> patch)
        {
            try
            {
                var item = _addAPearlService.GetItemById(id);
                if (item == null)
                {
                    _logger.LogWarning($"Item with Id {id} was not found...");
                    return NotFound($"Item with Id {id} was not found...");
                }

                patch.ApplyTo(item, ModelState); //Populates ModelState with any patch errors (ie replacing a property that does not exist)
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A Patching Operation Errored Against the ModelState...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }

                TryValidateModel(item); //Populates ModelState with any validation errors for the Address Model 
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A ModelState validation Error Occurred...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }

                item = _addAPearlService.UpdateItem(item);
                return Ok(item);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An Item Update Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpDelete("{id}")]
        [ActionName("Item")]
        public IActionResult DeleteById(int id)
        {
            try
            {
                var item = _addAPearlService.GetItemById(id);
                if (item == null)
                    return NotFound();

                var affectedRecords = _addAPearlService.DeleteItem(item);
                if (affectedRecords > 0)
                    return Ok(item);

                return NoContent();
            }
            catch (Exception objEx)
            {
                _logger.LogError("An Item Deletion Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }
    }
}
