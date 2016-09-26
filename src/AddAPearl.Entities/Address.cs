using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Entities
{
    [Table("Address")]
    public partial class Address
    {
        [Key]
        public int AddressId { get; set; }

        [StringLength(4000)]
        public string AddressLine1 { get; set; }

        [StringLength(4000)]
        public string AddressLine2 { get; set; }

        [StringLength(4000)]
        public string AddressLine3 { get; set; }

        [StringLength(4000)]
        public string City { get; set; }

        [StringLength(4000)]
        public string State { get; set; }

        [StringLength(4000)]
        public string ZipCode { get; set; }
    }
}
