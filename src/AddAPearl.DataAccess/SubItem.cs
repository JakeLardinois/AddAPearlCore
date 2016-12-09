using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddAPearl.DataAccess
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
