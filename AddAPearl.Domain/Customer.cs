using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Domain
{
    public class Customer
    {
        public int CustomerId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime BirthDay { get; set; }

        public string Email { get; set; }

        public int CompanyId { get; set; }

        public Company Company { get; set; }

        public int? AddressId { get; set; }

        public Address Address { get; set; }
    }
}
