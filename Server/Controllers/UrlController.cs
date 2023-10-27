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
            var result = _urlService.getAll();
            return Ok(await result);
        }

        [HttpPost]
        public async Task<ActionResult<List<Url>>> postUrl(string longUrl)
        {
            try
            {
                return Ok(await _urlService.createUrl(longUrl));
            }
            catch (Exception ex)
            {
               return BadRequest(ex.Message);
            }

        }


    }
}
