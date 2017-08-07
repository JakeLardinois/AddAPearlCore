using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AddAPearl.Domain
{
    public class Company
    {
        public int CompanyId { get; set; }
        
        [Required]
        public string CompanyName { get; set; }

        public string Email { get; set; }

        public int? AddressId { get; set; }

        public Address Address { get; set; }
    }
}
