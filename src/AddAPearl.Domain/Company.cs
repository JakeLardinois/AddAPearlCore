using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AddAPearl.Core;

namespace AddAPearl.Domain
{
    public class Company : ICompany
    {
        public int CompanyId { get; set; }
        
        [Required]
        public string CompanyName { get; set; }

        public int? AddressId { get; set; }

        public IAddress Address { get; set; }
    }
}
