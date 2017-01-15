using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Core;

namespace AddAPearl.Domain
{
    public class Customer : ICustomer
    {
        public int CustomerId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime BirthDay { get; set; }

        public string Email { get; set; }

        public int CompanyId { get; set; }

        public ICompany Company { get; set; }

        public int AddressId { get; set; }

        public IAddress Address { get; set; }
    }
}
