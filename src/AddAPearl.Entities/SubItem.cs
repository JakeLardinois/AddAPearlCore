using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Entities
{
    [Table("SubItem")]
    public partial class SubItem
    {
        [Key]
        public int SubItemId { get; set; }
        
        public int ItemId { get; set; }

        public decimal? Price { get; set; }
        
        public decimal PurchasePrice { get; set; }

        public DateTime? PurchaseDate { get; set; }

        public string Description { get; set; }
        
        public int OwnerId { get; set; }
        
        public int CustomerId { get; set; }
    }
}
