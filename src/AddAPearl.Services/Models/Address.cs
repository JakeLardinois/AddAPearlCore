using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Services.Models
{
    public class Address
    {
        public int AddressId { get; set; }
        
        public string AddressLine1 { get; set; }
        
        public string AddressLine2 { get; set; }
        
        public string AddressLine3 { get; set; }
        
        public string City { get; set; }
        
        public string State { get; set; }
        
        public string ZipCode { get; set; }
    }
}
