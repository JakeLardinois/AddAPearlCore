using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Services.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace AddAPearl.Services
{
    public class AddAPearlService
    {
        private readonly Entities.AddAPearlContext _addAPearl;


        public AddAPearlService(Entities.AddAPearlContext addAPearlContext)
        {
            _addAPearl = addAPearlContext;

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Entities.Company, Company>()
                    .ForMember(c => c.Address, 
                    opt => opt.MapFrom(a => Mapper.Map<Entities.Address, Address>(a.Address)));
                cfg.CreateMap<Entities.Address, Address>();
            });
        }

        public IEnumerable<Company> GetCompanies()
        {
            return _addAPearl.Companies.Include(a => a.Address)
                .ProjectTo<Models.Company>();
        }

        public Company GetCompanyById(int id)
        {
            return _addAPearl.Companies
                .ProjectTo<Models.Company>()
                .FirstOrDefault(c => c.CompanyId == id);

        }
    }
}
