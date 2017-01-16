using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddAPearl.DataAccess
{
    [Table("Customer")]
    public partial class Customer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Customer()
        {
            Items = new HashSet<Item>();
            ItemsOwned = new HashSet<Item>();
            SubItems = new HashSet<SubItem>();
            SubItemsOwned = new HashSet<SubItem>();
        }

        [Key]
        public int CustomerId { get; set; }

        [StringLength(4000)]
        public string FirstName { get; set; }

        [StringLength(4000)]
        public string LastName { get; set; }

        [StringLength(4000)]
        public string PhoneNumber { get; set; }

        public DateTime BirthDay { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        public int CompanyId { get; set; }

        public Company Company { get; set; }

        public int? AddressId { get; set; }

        public Address Address { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Item> Items { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Item> ItemsOwned { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SubItem> SubItems { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SubItem> SubItemsOwned { get; set; }
    }
}
