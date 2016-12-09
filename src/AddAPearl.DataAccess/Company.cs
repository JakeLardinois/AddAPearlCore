using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddAPearl.DataAccess
{
    [Table("Company")]
    public partial class Company
    {
        [Key]
        public int CompanyId { get; set; }

        [StringLength(50)]
        public string CompanyName { get; set; }

        public int? AddressId { get; set; }

        public Address Address { get; set; }
    }
}
