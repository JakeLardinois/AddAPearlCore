using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Core
{
    public interface IProduct
    {
        int ProductId { get; set; }

        string ProductName { get; set; }

        string ProductCode { get; set; }

        DateTime? ReleaseDate { get; set; }

        decimal? Price { get; set; }

        decimal PurchasePrice { get; set; }

        DateTime? PurchaseDate { get; set; }

        string Description { get; set; }

        decimal? Rating { get; set; }
    }
}
