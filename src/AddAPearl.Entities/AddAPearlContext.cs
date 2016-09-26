using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AddAPearl.Entities
{
    public class AddAPearlContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("data source=JLARDINOIS\\SQL2014;initial catalog=AddAPearl;persist security info=True;user id=sa;password=wh0r353;MultipleActiveResultSets=True;App=EntityFramework");
        }


        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<SubItem> SubItems { get; set; }
    }
}
