using Microsoft.EntityFrameworkCore;

namespace Server.DataContextConfig
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }
    }
}
