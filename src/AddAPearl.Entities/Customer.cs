using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Entities
{
    [Table("Customer")]
    public partial class Customer
    {
        public int CustomerId { get; set; }

        [StringLength(4000)]
        public string FirstName { get; set; }

        [StringLength(4000)]
        public string LastName { get; set; }

        [StringLength(4000)]
        public string PhoneNumber { get; set; }

        public DateTime BirthDay { get; set; }

        public int AddressId { get; set; }

        public int CompanyId { get; set; }
    }
}
