using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Server.DataContextConfig;
using Server.Entity;

namespace Server.Service
{
    public class UrlService : IUrlService
    {
        private readonly DataContext _dataContext;
        private readonly UrlGeneratorHelperService _urlGeneratorHelperService;
        public UrlService(DataContext dataContext, UrlGeneratorHelperService urlGeneratorHelperService)
        {
            _dataContext = dataContext;   
            _urlGeneratorHelperService = urlGeneratorHelperService;
        }

        public async Task<List<Url>> GetAll()
        {
            return await _dataContext.Urls.ToListAsync();
        }

        public async Task<List<Url>> CreateUrl(string url)
        {
            if (!_urlGeneratorHelperService.validateUrl(url))
            {
                throw new Exception("Invalid url");
            }
            else if(_dataContext.Urls.Any(e => e.OriginalUrl == url))
            {
                throw new Exception("Such url shortener already exists");
            }

            string baseUrl = "http://localhost:5174/easy/";
            string shortenedUrl = await _urlGeneratorHelperService.generateUnique(baseUrl, 7);
            Url createdUrl = new Url()
                {
                    OriginalUrl = url,
                    ShortenedUrl = shortenedUrl,
                    CreatedAt = DateTime.UtcNow,
                };

            var result = await _dataContext.Urls.AddAsync(createdUrl);
            await _dataContext.SaveChangesAsync();
            return await _dataContext.Urls.ToListAsync(); 
         }


        public async Task<Url> FindById(int id)
        {
            try
            {
                Url requestedUrl = await _dataContext.Urls.FirstAsync(e => e.Id == id);
                return requestedUrl;
            }
            catch (Exception ex)
            {
                throw new Exception("Such URL was not found");
            }
        }


        }
}



