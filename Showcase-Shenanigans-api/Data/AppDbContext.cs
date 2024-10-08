using Microsoft.EntityFrameworkCore;

namespace Showcase_Shenanigans_api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<MovieEvent> MovieEvents { get; set; }
        public DbSet<Booking> Bookings { get; set; }
    }
}
