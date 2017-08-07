using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Domain
{
    public class Item
    {
        public int ItemId { get; set; }

        public Product Product { get; set; }

        public int ProductId { get; set; }

        public string ItemName { get; set; }

        public decimal? Price { get; set; }

        public decimal PurchasePrice { get; set; }

        public DateTime? PurchaseDate { get; set; }

        public string Description { get; set; }

        public Customer Owner { get; set; }

        public int OwnerId { get; set; }

        public Customer Customer { get; set; }

        public int CustomerId { get; set; }

        public ICollection<SubItem> SubItems { get; set; }

        public decimal? Rating { get; set; }
    }
}
