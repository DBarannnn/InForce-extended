using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Server.DataContextConfig;
using Server.Entity;

namespace Server.Service
{
    public class UrlService : IUrlService
    {
        private readonly DataContext _dataContext;
        public UrlService(DataContext dataContext)
        {
            _dataContext = dataContext;   
        }

        public async Task<List<Url>> getAll()
        {
            return await _dataContext.Urls.ToListAsync();
        }
    }
}
