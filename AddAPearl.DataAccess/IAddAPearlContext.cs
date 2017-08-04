using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace AddAPearl.DataAccess
{
    public interface IAddAPearlContext
    {
        DbSet<Address> Addresses { get; set; }
        DbSet<Company> Companies { get; set; }
        DbSet<Customer> Customers { get; set; }
        DbSet<Item> Items { get; set; }
        DbSet<Product> Products { get; set; }
        DbSet<SubItem> SubItems { get; set; }

        int SaveChanges();
    }
}
