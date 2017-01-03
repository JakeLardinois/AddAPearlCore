using Microsoft.EntityFrameworkCore;

namespace AddAPearl.DataAccess
{
    public class AddAPearlContext : DbContext
    {
        public AddAPearlContext(DbContextOptions<AddAPearlContext> options) : base(options) { }

        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<SubItem> SubItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Item>()
            //    .HasMany(e => e.SubItems)
            //    .WithOne(e => e.Item)
            //    .HasForeignKey(e => e.ItemId);
        }
    }
}
