using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Core
{
    public interface ICustomer
    {
        int CustomerId { get; set; }
        
        string FirstName { get; set; }

        string LastName { get; set; }
        
        string PhoneNumber { get; set; }

        DateTime BirthDay { get; set; }

        int AddressId { get; set; }

        int CompanyId { get; set; }

        IAddress Address { get; set; }
    }
}
