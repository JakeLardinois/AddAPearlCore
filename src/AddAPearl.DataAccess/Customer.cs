using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddAPearl.DataAccess
{
    [Table("Customer")]
    public partial class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        [StringLength(4000)]
        public string FirstName { get; set; }

        [StringLength(4000)]
        public string LastName { get; set; }

        [StringLength(4000)]
        public string PhoneNumber { get; set; }

        public DateTime BirthDay { get; set; }

        public int CompanyId { get; set; }

        public Company Company { get; set; }

        public int AddressId { get; set; }

        public Address Address { get; set; }
    }
}
