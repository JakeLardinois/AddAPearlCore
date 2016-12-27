using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AddAPearl.Core;
using AddAPearl.DataAccess;
using AddAPearl.Domain;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AddAPearl.Services
{
    public class AddAPearlService : IAddAPearlService
    {
        private readonly AddAPearlContext _addAPearl;
        private readonly ILogger _logger;

        public AddAPearlService(AddAPearlContext addAPearlContext, ILogger<AddAPearlService> logger)
        {
            _addAPearl = addAPearlContext;
            _logger = logger;

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<DataAccess.Company, Domain.Company>()
                    .ForMember(c => c.Address,
                        opt => opt.MapFrom(a => Mapper.Map<DataAccess.Address, Domain.Address>(a.Address)));
                cfg.CreateMap<DataAccess.Address, Domain.Address>()
                    .ReverseMap();
            });
        }

        public IEnumerable<ICompany> GetCompanies()
        {
            _logger.LogInformation("Executing: IEnumerable<ICompany> GetCompanies()");
            return _addAPearl.Companies.Include(a => a.Address)
                .ProjectTo<Domain.Company>();
        }

        public ICompany GetCompanyById(int id)
        {
            return _addAPearl.Companies
                .ProjectTo<Domain.Company>()
                .FirstOrDefault(c => c.CompanyId == id);

        }

        public IEnumerable<IAddress> GetAddresses()
        {
            return _addAPearl.Addresses
                .ProjectTo<Domain.Address>();
        }

        public IAddress GetAddressById(int id)
        {
            return Mapper.Map<Domain.Address>(_addAPearl.Addresses
                .AsNoTracking() //required since this method gets called when updating the entity
                .FirstOrDefault(a => a.AddressId == id));
        }

        public IAddress UpdateAddress(IAddress address)
        {
            var theAddress = Mapper.Map<DataAccess.Address>(address);
            //_addAPearl.Entry(theAddress).State = EntityState.Modified; //alternative syntax
            _addAPearl.Addresses.Attach(theAddress).State = EntityState.Modified;
            _addAPearl.SaveChanges();

            return Mapper.Map<Domain.Address>(_addAPearl.Addresses
                .FirstOrDefault(a => a.AddressId == address.AddressId));
        }
    }
}
