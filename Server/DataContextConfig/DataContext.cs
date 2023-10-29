using Microsoft.EntityFrameworkCore;
using Server.Entity;

namespace Server.DataContextConfig
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
            });
        }

        public DbSet<Url> Urls { get; set; }
        public DbSet<User> Users { get; set; }

       

    }
}
