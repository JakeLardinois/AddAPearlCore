using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Core
{
    public interface IAddress
    {
        int AddressId { get; set; }

        string AddressLine1 { get; set; }

        string AddressLine2 { get; set; }

        string AddressLine3 { get; set; }

        string City { get; set; }

        string State { get; set; }

        string ZipCode { get; set; }
    }
}
