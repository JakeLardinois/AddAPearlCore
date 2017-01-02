using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Core;

namespace AddAPearl.Domain
{
    public class SubItem : ISubItem
    {
        public int SubItemId { get; set; }

        public IItem Item { get; set; }

        public int ItemId { get; set; }

        public IProduct Product { get; set; }

        public int ProductId { get; set; }

        public string SubItemName { get; set; }

        public decimal? Price { get; set; }

        public decimal PurchasePrice { get; set; }

        public DateTime? PurchaseDate { get; set; }

        public string Description { get; set; }

        public ICustomer Owner { get; set; }

        public int OwnerId { get; set; }

        public ICustomer Customer { get; set; }

        public int CustomerId { get; set; }

        public decimal? Rating { get; set; }
    }
}
