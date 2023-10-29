using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Entity;
using Server.Helper;
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
        public async Task<ActionResult<List<Url>>> GetAllUrls()
        {
            var result = _urlService.GetAll();
            return Ok(await result);
        }

        [HttpPost]
        public async Task<ActionResult<List<Url>>> PostUrl([FromBody]string longUrl)
        {
            try
            {
                var response = await _urlService.CreateUrl(longUrl);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return ErrorBuilder.BuildErrorResponse(ex.Message);
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
                return ErrorBuilder.BuildErrorResponse(ex.Message);
            }
        }

        [HttpDelete]
        [Route("delete/{urlId}")]
        public async Task<ActionResult<List<Url>>> DeleteUrl(int urlId)
        {
            try
            {
                return Accepted(await _urlService.DeleteUrl(urlId));
            }
            catch (Exception ex)
            {
                return ErrorBuilder.BuildErrorResponse(ex.Message);
            }
        }

        [HttpGet]
        [Route("easy")]
        public async Task<ActionResult<String>> FindOriginalUrl([FromHeader]string shortenedUrl)
        {
            try
            {
                var originalUrl = await _urlService.findByShortenedUrl(shortenedUrl);
                return originalUrl;
            }
             catch (Exception ex)
            {
                return ErrorBuilder.BuildErrorResponse(ex.Message);
            }
        }


    }
}
