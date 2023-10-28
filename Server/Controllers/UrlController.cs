using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Entity;
using Server.Service;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlController : ControllerBase
    {
        private readonly IUrlService _urlService;

        public UrlController(IUrlService urlService)
        {
            _urlService = urlService;   
        }

        [HttpGet]
        public async Task<ActionResult<List<Url>>> getAllUrls()
        {
            var result = _urlService.GetAll();
            return Ok(await result);
        }

        [HttpPost]
        public async Task<ActionResult<List<Url>>> postUrl([FromBody] string longUrl)
        {
            try
            {
                var response = await _urlService.CreateUrl(longUrl);
                return Ok(response);
            }
            catch (Exception ex)
            {
                var errorResponse = new { msg = ex.Message };
                return new ObjectResult(errorResponse)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }
        }

        [HttpGet]
        [Route("{urlId}")]
        public async Task<ActionResult<Url>> GetUrl(int urlId)
        {
            try
            {
                return Ok(await _urlService.FindById(urlId));
            }
            catch(Exception ex)
            {
                var errorResponse = new { msg = ex.Message };
                return new ObjectResult(errorResponse)
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }
        }









    }
}
