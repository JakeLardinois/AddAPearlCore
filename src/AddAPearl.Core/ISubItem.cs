using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Core
{
    public interface ISubItem
    {
        int SubItemId { get; set; }

        IItem Item { get; set; }

        int ItemId { get; set; }

        IProduct Product { get; set; }

        int ProductId { get; set; }
        
        string SubItemName { get; set; }

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
