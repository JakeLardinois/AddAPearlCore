using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Core;

namespace AddAPearl.Domain
{
    public class Product : IProduct
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public string ProductCode { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public decimal? Price { get; set; }

        public decimal PurchasePrice { get; set; }

        public DateTime? PurchaseDate { get; set; }

        public string Description { get; set; }

        public decimal? Rating { get; set; }
    }
}
