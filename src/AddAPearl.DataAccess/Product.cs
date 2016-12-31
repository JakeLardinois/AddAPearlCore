using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.DataAccess
{
    [Table("Product")]
    public partial class Product
    {
        [Key]
        public int ProductId { get; set; }

        [StringLength(4000)]
        public string ProductName { get; set; }

        [StringLength(4000)]
        public string ProductCode { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public decimal? Price { get; set; }

        public decimal PurchasePrice { get; set; }

        public DateTime? PurchaseDate { get; set; }

        public string Description { get; set; }

        public decimal? Rating { get; set; }
    }
}
