using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Core;
using AddAPearl.DataAccess;
using AddAPearl.Domain;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace AddAPearl.Services
{
    public class AddAPearlService: IAddAPearlService
    {
        private readonly AddAPearlContext _addAPearl;


        public AddAPearlService(AddAPearlContext addAPearlContext)
        {
            _addAPearl = addAPearlContext;

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<DataAccess.Company, Domain.Company>()
                    .ForMember(c => c.Address, 
                    opt => opt.MapFrom(a => Mapper.Map<DataAccess.Address, Domain.Address>(a.Address)));
                cfg.CreateMap<DataAccess.Address, Domain.Address>();
            });
        }

        public IEnumerable<ICompany> GetCompanies()
        {
            return _addAPearl.Companies.Include(a => a.Address)
                .ProjectTo<Domain.Company>();
        }

        public ICompany GetCompanyById(int id)
        {
            return _addAPearl.Companies
                .ProjectTo<Domain.Company>()
                .FirstOrDefault(c => c.CompanyId == id);

        }
    }
}
