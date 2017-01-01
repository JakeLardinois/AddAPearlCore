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

        public int DeleteAddress(IAddress address)
        {
            var theAddress = Mapper.Map<DataAccess.Address>(address);
            _addAPearl.Addresses.Attach(theAddress);
            _addAPearl.Addresses
                .Remove(theAddress);
            return _addAPearl.SaveChanges();
        }


        public IEnumerable<ICustomer> GetCustomers()
        {
            _logger.LogInformation("Executing: IEnumerable<ICustomer> GetCustomers()");
            return _addAPearl.Customers
                .Include(a => a.Address)
                .Include(a => a.Company)
                .ProjectTo<Domain.Customer>();
        }

        public ICustomer GetCustomerById(int id)
        {
            return Mapper.Map<Domain.Customer>(_addAPearl.Customers
                .Include(a => a.Address)
                .Include(a => a.Company)
                .AsNoTracking()
                .FirstOrDefault(a => a.CustomerId == id));
        }

        public ICustomer AddCustomer(ICustomer customer)
        {
            _logger.LogInformation("Adding a Customer");
            var customerToAdd = Mapper.Map<DataAccess.Customer>(customer);
            _addAPearl.Customers.Add(customerToAdd);
            _addAPearl.SaveChanges();
            return Mapper.Map<Domain.Customer>(customerToAdd);
        }

        public ICustomer UpdateCustomer(ICustomer customer)
        {
            var theCustomer = Mapper.Map<DataAccess.Customer>(customer);
            _addAPearl.Customers.Attach(theCustomer).State = EntityState.Modified;
            _addAPearl.SaveChanges();

            return Mapper.Map<Domain.Customer>(_addAPearl.Customers
                .FirstOrDefault(a => a.CustomerId == customer.CustomerId));
        }

        public int DeleteCustomer(ICustomer customer)
        {
            var theCustomer = Mapper.Map<DataAccess.Customer>(customer);
            _addAPearl.Customers.Attach(theCustomer);
            _addAPearl.Customers
                .Remove(theCustomer);
            return _addAPearl.SaveChanges();
        }


        public IEnumerable<IItem> GetItems()
        {
            _logger.LogInformation("Executing: IEnumerable<IItem> GetItems()");
            return _addAPearl.Items
                .Include(a => a.Product)
                .Include(a => a.Customer)
                .ProjectTo<Domain.Item>();
        }

        public IItem GetItemById(int id)
        {
            return Mapper.Map<Domain.Item>(_addAPearl.Items
                .Include(a => a.Product)
                .Include(a => a.Customer)
                .AsNoTracking()
                .FirstOrDefault(a => a.ItemId == id));
        }

        public IItem AddItem(IItem item)
        {
            _logger.LogInformation("Adding a Item");
            var itemToAdd = Mapper.Map<DataAccess.Item>(item);
            _addAPearl.Items.Add(itemToAdd);
            _addAPearl.SaveChanges();
            return Mapper.Map<Domain.Item>(itemToAdd);
        }

        public IItem UpdateItem(IItem item)
        {
            var theItem = Mapper.Map<DataAccess.Item>(item);
            _addAPearl.Items.Attach(theItem).State = EntityState.Modified;
            _addAPearl.SaveChanges();

            return Mapper.Map<Domain.Item>(_addAPearl.Items
                .FirstOrDefault(a => a.ItemId == item.ItemId));
        }

        public int DeleteItem(IItem item)
        {
            var theItem = Mapper.Map<DataAccess.Item>(item);
            _addAPearl.Items.Attach(theItem);
            _addAPearl.Items
                .Remove(theItem);
            return _addAPearl.SaveChanges();
        }


        public IEnumerable<IProduct> GetProducts()
        {
            _logger.LogInformation("Executing: IEnumerable<IProduct> GetProducts()");
            return _addAPearl.Products
                .ProjectTo<Domain.Product>();
        }

        public IProduct GetProductById(int id)
        {
            return Mapper.Map<Domain.Product>(_addAPearl.Products
                .AsNoTracking()
                .FirstOrDefault(a => a.ProductId == id));
        }

        public IProduct AddProduct(IProduct product)
        {
            _logger.LogInformation("Adding a Product");
            var productToAdd = Mapper.Map<DataAccess.Product>(product);
            _addAPearl.Products.Add(productToAdd);
            _addAPearl.SaveChanges();
            return Mapper.Map<Domain.Product>(productToAdd);
        }

        public IProduct UpdateProduct(IProduct product)
        {
            var theProduct = Mapper.Map<DataAccess.Product>(product);
            _addAPearl.Products.Attach(theProduct).State = EntityState.Modified;
            _addAPearl.SaveChanges();

            return Mapper.Map<Domain.Product>(_addAPearl.Products
                .FirstOrDefault(a => a.ProductId == product.ProductId));
        }

        public int DeleteProduct(IProduct product)
        {
            var theProduct = Mapper.Map<DataAccess.Product>(product);
            _addAPearl.Products.Attach(theProduct);
            _addAPearl.Products
                .Remove(theProduct);
            return _addAPearl.SaveChanges();
        }


        public IEnumerable<ISubItem> GetSubItems()
        {
            _logger.LogInformation("Executing: IEnumerable<ISubItem> GetSubItems()");
            return _addAPearl.SubItems
                .Include(a => a.Item)
                .Include(a => a.Product)
                .Include(a => a.Customer)
                .ProjectTo<Domain.SubItem>();
        }

        public ISubItem GetSubItemById(int id)
        {
            return Mapper.Map<Domain.SubItem>(_addAPearl.SubItems
                .Include(a => a.Item)
                .Include(a => a.Product)
                .Include(a => a.Customer)
                .AsNoTracking()
                .FirstOrDefault(a => a.SubItemId == id));
        }

        public ISubItem AddSubItem(ISubItem subitem)
        {
            _logger.LogInformation("Adding a SubItem");
            var subitemToAdd = Mapper.Map<DataAccess.SubItem>(subitem);
            _addAPearl.SubItems.Add(subitemToAdd);
            _addAPearl.SaveChanges();
            return Mapper.Map<Domain.SubItem>(subitemToAdd);
        }

        public ISubItem UpdateSubItem(ISubItem subitem)
        {
            var theSubItem = Mapper.Map<DataAccess.SubItem>(subitem);
            _addAPearl.SubItems.Attach(theSubItem).State = EntityState.Modified;
            _addAPearl.SaveChanges();

            return Mapper.Map<Domain.SubItem>(_addAPearl.SubItems
                .FirstOrDefault(a => a.SubItemId == subitem.SubItemId));
        }

        public int DeleteSubItem(ISubItem subitem)
        {
            var theSubItem = Mapper.Map<DataAccess.SubItem>(subitem);
            _addAPearl.SubItems.Attach(theSubItem);
            _addAPearl.SubItems
                .Remove(theSubItem);
            return _addAPearl.SaveChanges();
        }

    }
}
