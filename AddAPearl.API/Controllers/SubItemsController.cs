using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Domain;
using AddAPearl.Services;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AddAPearl.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class SubItemsController : Controller
    {
        private static IAddAPearlService _addAPearlService;
        private readonly ILogger _logger;

        public SubItemsController(IAddAPearlService addAPearlService, ILogger<SubItemsController> logger)
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
                _logger.LogInformation("Returning all the subitems");
                var subitems = await _addAPearlService.GetSubItems();
                return Ok(subitems);
            }
            catch (Exception objEx)
            {
                _logger.LogError("SubItems Exception!", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpGet("{id}")]
        [ActionName("SubItem")]
        public IActionResult GetById(int id)
        {
            try
            {
                var subitem = _addAPearlService.GetSubItemById(id);
                if (subitem == null)
                    return NotFound();

                return Ok(subitem);
            }
            catch (Exception objEx)
            {
                _logger.LogError("SubItem Exception!", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpPost]
        [ActionName("SubItem")]
        public IActionResult Add([FromBody] SubItem subitem)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A ModelState validation Error Occurred...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }
                var newSubItem = _addAPearlService.AddSubItem(subitem);

                return Ok(newSubItem);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An AddSubItem Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpPatch("{id}")]
        [ActionName("SubItem")]
        public IActionResult Update(int id, [FromBody] JsonPatchDocument<SubItem> patch)
        {
            try
            {
                var subitem = _addAPearlService.GetSubItemById(id);
                if (subitem == null)
                {
                    _logger.LogWarning($"SubItem with Id {id} was not found...");
                    return NotFound($"SubItem with Id {id} was not found...");
                }

                patch.ApplyTo(subitem, ModelState); //Populates ModelState with any patch errors (ie replacing a property that does not exist)
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A Patching Operation Errored Against the ModelState...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }

                TryValidateModel(subitem); //Populates ModelState with any validation errors for the Address Model 
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("A ModelState validation Error Occurred...", ModelState);
                    return new BadRequestObjectResult(ModelState);
                }

                subitem = _addAPearlService.UpdateSubItem(subitem);
                return Ok(subitem);
            }
            catch (Exception objEx)
            {
                _logger.LogError("An SubItem Update Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }

        [HttpDelete("{id}")]
        [ActionName("SubItem")]
        public IActionResult DeleteById(int id)
        {
            try
            {
                var subitem = _addAPearlService.GetSubItemById(id);
                if (subitem == null)
                    return NotFound();

                var affectedRecords = _addAPearlService.DeleteSubItem(subitem);
                if (affectedRecords > 0)
                    return Ok(subitem);

                return NoContent();

            }
            catch (Exception objEx)
            {
                _logger.LogError("An SubItem Deletion Error Occurred...", objEx);
                return BadRequest(objEx);
            }
        }
    }
}
