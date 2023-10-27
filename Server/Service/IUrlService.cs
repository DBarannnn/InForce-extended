using Server.Entity;

namespace Server.Service
{
    public interface IUrlService
    {
        public Task<List<Url>> getAll();
        public Task<List<Url>> createUrl(string url);
    }
}
