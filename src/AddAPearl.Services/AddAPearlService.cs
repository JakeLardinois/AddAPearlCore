using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Entities;

namespace AddAPearl.Services
{
    public class AddAPearlService
    {
        private readonly AddAPearlContext _addAPearl;


        public AddAPearlService(AddAPearlContext addAPearlContext)
        {
            _addAPearl = addAPearlContext;
        }

        public IList<Company> GetCompanies()
        {
            return _addAPearl.Companies.ToList();
        }
    }
}
