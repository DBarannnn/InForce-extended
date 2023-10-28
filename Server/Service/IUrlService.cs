using Server.Entity;

namespace Server.Service
{
    public interface IUrlService
    {
        public Task<List<Url>> GetAll();
        public Task<List<Url>> CreateUrl(string url);

        public Task<Url> FindById(int id);
    }
}
