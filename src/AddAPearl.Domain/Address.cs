using System.ComponentModel.DataAnnotations;
using AddAPearl.Core;

namespace AddAPearl.Domain
{
    public class Address: IAddress
    {
        public int AddressId { get; set; }
        
        public string AddressLine1 { get; set; }
        
        public string AddressLine2 { get; set; }
        
        public string AddressLine3 { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string City { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string State { get; set; }
        
        public string ZipCode { get; set; }
    }
}
