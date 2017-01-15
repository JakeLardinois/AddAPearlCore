using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddAPearl.DataAccess
{
    [Table("Item")]
    public partial class Item
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Item()
        {
            SubItems = new HashSet<SubItem>();
        }

        [Key]
        public int ItemId { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        [StringLength(4000)]
        public string ItemName { get; set; }

        public decimal? Price { get; set; }

        public decimal PurchasePrice { get; set; }

        public DateTime? PurchaseDate { get; set; }

        public string Description { get; set; }

        public Customer Owner { get; set; }

        public int OwnerId { get; set; }

        public Customer Customer { get; set; }

        public int CustomerId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SubItem> SubItems { get; set; }

        public decimal? Rating { get; set; }
    }
}
