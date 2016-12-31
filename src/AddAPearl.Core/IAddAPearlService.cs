using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Core
{
    public interface IAddAPearlService
    {
        IEnumerable<ICompany> GetCompanies();
        ICompany GetCompanyById(int id);
        ICompany AddCompany(ICompany company);
        ICompany UpdateCompany(ICompany company);
        int DeleteCompany(ICompany company);


        IEnumerable<IAddress> GetAddresses();
        IAddress GetAddressById(int id);
        IAddress AddAddress(IAddress address);
        IAddress UpdateAddress(IAddress address);
    }
}
