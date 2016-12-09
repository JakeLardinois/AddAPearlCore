using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Core
{
    interface ICompany
    {
        int CompanyId { get; set; }

        string CompanyName { get; set; }

        int? AddressId { get; set; }

        IAddress Address { get; set; }
    }
}
