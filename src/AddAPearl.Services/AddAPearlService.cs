using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AddAPearl.Core;
using AddAPearl.DataAccess;
using AddAPearl.Services.Helpers;
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
                cfg.AddProfile(new AutoMapperProfile());
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
                .AsNoTracking() //required since this method gets called when updating the entity
                .FirstOrDefault(c => c.CompanyId == id);

        }

        public ICompany AddCompany(ICompany company)
        {
            _logger.LogInformation("Adding a Company");
            var companyToAdd = Mapper.Map<DataAccess.Company>(company);
            _addAPearl.Companies.Add(companyToAdd);
            _addAPearl.SaveChanges();
            return Mapper.Map<Domain.Company>(companyToAdd);
        }

        public ICompany UpdateCompany(ICompany company)
        {
            var theCompany = Mapper.Map<DataAccess.Company>(company);
            _addAPearl.Companies.Attach(theCompany).State = EntityState.Modified;
            _addAPearl.SaveChanges();

            return Mapper.Map<Domain.Company>(_addAPearl.Companies
                .FirstOrDefault(a => a.CompanyId == company.CompanyId));
        }

        public int DeleteCompany(ICompany company)
        {
            var theCompany = Mapper.Map<DataAccess.Company>(company);
            _addAPearl.Companies.Attach(theCompany);
            _addAPearl.Companies
                .Remove(theCompany);
            return _addAPearl.SaveChanges();
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

        public IAddress AddAddress(IAddress address)
        {
            _logger.LogInformation("Adding a Address");
            var addressToAdd = Mapper.Map<DataAccess.Address>(address);
            _addAPearl.Addresses.Add(addressToAdd);
            _addAPearl.SaveChanges();
            return Mapper.Map<Domain.Address>(addressToAdd);
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
