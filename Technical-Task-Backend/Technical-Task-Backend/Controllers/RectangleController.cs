using Microsoft.AspNetCore.Mvc;
using Technical.Task.Model;
using Technical.Task.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Technical.Task.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RectangleController : ControllerBase
    {
        private readonly IRectangleService _rectangleService;

        public RectangleController(IRectangleService rectangleService)
        {
            _rectangleService = rectangleService;
        }

        [HttpGet("")]
        public IActionResult GetRectangle()
        {
            var rectangle = _rectangleService.GetRectangle();
            return Ok(rectangle);
        }
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public IActionResult DrawRectangle([FromBody] Rectangle rectangle)
        {
            _rectangleService.DrawRectangle(rectangle);
            return Ok();

        }

        [HttpPut("update")]
        public IActionResult UpdateRectangle([FromBody] Rectangle rectangle)
        {
            _rectangleService.UpdateRectangle(rectangle);
            return Ok();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
