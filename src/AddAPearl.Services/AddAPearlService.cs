using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Entities;
using Microsoft.EntityFrameworkCore;

namespace AddAPearl.Services
{
    public class AddAPearlService
    {
        private readonly AddAPearlContext _addAPearl;


        public AddAPearlService(AddAPearlContext addAPearlContext)
        {
            _addAPearl = addAPearlContext;
        }

        public IEnumerable<Company> GetCompanies()
        {
            return _addAPearl.Companies.Include(a => a.Address);
        }

        public Company GetCompanyById(int id)
        {
            return _addAPearl.Companies
                .FirstOrDefault(c => c.CompanyId == id);
        }
    }
}
