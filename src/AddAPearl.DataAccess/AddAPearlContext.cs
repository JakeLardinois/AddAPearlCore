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
            modelBuilder.Entity<Address>()
                .HasMany(e => e.Customers)
                .WithOne(e => e.Address)
                .HasForeignKey(e => e.AddressId);

            modelBuilder.Entity<Company>()
                .HasMany(e => e.Customers)
                .WithOne(e => e.Company)
                .HasForeignKey(e => e.CompanyId);

            modelBuilder.Entity<Customer>()
                .HasMany(e => e.Items)
                .WithOne(e => e.Customer)
                .HasForeignKey(e => e.CustomerId);

            modelBuilder.Entity<Customer>()
                .HasMany(e => e.ItemsOwned)
                .WithOne(e => e.Owner)
                .HasForeignKey(e => e.OwnerId);

            modelBuilder.Entity<Customer>()
                .HasMany(e => e.SubItems)
                .WithOne(e => e.Customer)
                .HasForeignKey(e => e.CustomerId);

            modelBuilder.Entity<Customer>()
                .HasMany(e => e.SubItemsOwned)
                .WithOne(e => e.Owner)
                .HasForeignKey(e => e.OwnerId);
            
            modelBuilder.Entity<Item>()
                .HasMany(e => e.SubItems)
                .WithOne(e => e.Item)
                .HasForeignKey(e => e.ItemId);

            modelBuilder.Entity<Product>()
                .HasMany(e => e.Items)
                .WithOne(e => e.Product)
                .HasForeignKey(e => e.ProductId);

            modelBuilder.Entity<Product>()
                .HasMany(e => e.SubItems)
                .WithOne(e => e.Product)
                .HasForeignKey(e => e.ProductId);
        }
    }
}
