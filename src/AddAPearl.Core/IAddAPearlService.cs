using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Core
{
    interface IAddAPearlService
    {
        IEnumerable<ICompany> GetCompanies();

        ICompany GetCompanyById(int id);
    }
}
