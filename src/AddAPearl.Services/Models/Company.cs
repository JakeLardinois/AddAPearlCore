using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Services.Models
{
    public class Company
    {
        public int CompanyId { get; set; }
        
        public string CompanyName { get; set; }

        public int? AddressId { get; set; }

        public Address Address { get; set; }
    }
}
