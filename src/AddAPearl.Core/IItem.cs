using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Core
{
    public interface IItem
    {
        int ItemId { get; set; }

        IProduct Product { get; set; }

        int ProductId { get; set; }

        string ItemName { get; set; }

        decimal? Price { get; set; }

        decimal PurchasePrice { get; set; }

        DateTime? PurchaseDate { get; set; }

        string Description { get; set; }

        int OwnerId { get; set; }

        ICustomer Customer { get; set; }

        int CustomerId { get; set; }

        decimal? Rating { get; set; }
    }
}
