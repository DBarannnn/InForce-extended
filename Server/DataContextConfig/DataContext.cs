using Microsoft.EntityFrameworkCore;
using Server.Entity;

namespace Server.DataContextConfig
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<Url> Urls { get; set; }

    }
}
