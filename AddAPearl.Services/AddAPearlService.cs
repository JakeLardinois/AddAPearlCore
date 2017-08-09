using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AddAPearl.DataAccess;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AddAPearl.Services
{
    public class AddAPearlService : IAddAPearlService
    {
        private readonly IAddAPearlContext _addAPearl;
        private readonly ILogger _logger;
        private readonly IMapper _internalMapper;

        public AddAPearlService(IAddAPearlContext addAPearlContext, ILogger<AddAPearlService> logger, IMapper mapper)
        {
            _addAPearl = addAPearlContext;
            if (_addAPearl == null) throw new ArgumentNullException(nameof(_addAPearl));

            _logger = logger;
            if (_logger == null) throw new ArgumentNullException(nameof(_logger));

            _internalMapper = mapper;
            if (_internalMapper == null) throw new ArgumentNullException(nameof(_internalMapper));
        }

        #region Companies
        public async Task<IEnumerable<Domain.Company>> GetCompaniesAsync()
        {
            _logger.LogInformation("Executing: IEnumerable<Domain.Company> GetCompaniesAsync()");
            return await _addAPearl.Companies
                .Include(a => a.Address)
                .ProjectTo<Domain.Company>(_internalMapper.ConfigurationProvider)
                .ToListAsync();
        }

        public IEnumerable<Domain.Company> GetCompanies()
        {
            _logger.LogInformation("Executing: IEnumerable<Domain.Company> GetCompanies()");
            return _addAPearl.Companies
                .Include(a => a.Address)
                .ProjectTo<Domain.Company>(_internalMapper.ConfigurationProvider)
                .ToList();
        }

        public Domain.Company GetCompanyById(int id)
        {
            return _addAPearl.Companies
                .Include(a => a.Address)
                .ProjectTo<Domain.Company>(_internalMapper.ConfigurationProvider)
                .AsNoTracking() //required since this method gets called when updating the entity
                .FirstOrDefault(c => c.CompanyId == id);

        }

        public Domain.Company AddCompany(Domain.Company company)
        {
            _logger.LogInformation("Adding a Company");
            var companyToAdd = _internalMapper.Map<DataAccess.Company>(company);
            _addAPearl.Companies.Add(companyToAdd);
            _addAPearl.SaveChanges();
            return _internalMapper.Map<Domain.Company>(companyToAdd);
        }

        public Domain.Company UpdateCompany(Domain.Company company)
        {
            var theCompany = _internalMapper.Map<DataAccess.Company>(company);
            _addAPearl.Companies.Attach(theCompany).State = EntityState.Modified;
            _addAPearl.SaveChanges();

            return _internalMapper.Map<Domain.Company>(_addAPearl.Companies
                .FirstOrDefault(a => a.CompanyId == company.CompanyId));
        }

        public int DeleteCompany(Domain.Company company)
        {
            var theCompany = _internalMapper.Map<DataAccess.Company>(company);
            _addAPearl.Companies.Attach(theCompany);
            _addAPearl.Companies
                .Remove(theCompany);
            return _addAPearl.SaveChanges();
        }
        #endregion

        #region Addresses
        public async Task<IEnumerable<Domain.Address>> GetAddresses()
        {
            _logger.LogInformation("Executing: IEnumerable<Domain.Address> GetAddresses()");
            return await _addAPearl.Addresses
                .ProjectTo<Domain.Address>(_internalMapper.ConfigurationProvider)
                .ToListAsync();
        }

        public Domain.Address GetAddressById(int id)
        {
            return _internalMapper.Map<Domain.Address>(_addAPearl.Addresses
                .AsNoTracking() //required since this method gets called when updating the entity
                .FirstOrDefault(a => a.AddressId == id));
        }

        public Domain.Address AddAddress(Domain.Address address)
        {
            _logger.LogInformation("Adding a Address");
            var addressToAdd = _internalMapper.Map<DataAccess.Address>(address);
            _addAPearl.Addresses.Add(addressToAdd);
            _addAPearl.SaveChanges();
            return _internalMapper.Map<Domain.Address>(addressToAdd);
        }

        public Domain.Address UpdateAddress(Domain.Address address)
        {
            var theAddress = _internalMapper.Map<DataAccess.Address>(address);
            //_addAPearl.Entry(theAddress).State = EntityState.Modified; //alternative syntax
            _addAPearl.Addresses.Attach(theAddress).State = EntityState.Modified;
            _addAPearl.SaveChanges();

            return _internalMapper.Map<Domain.Address>(_addAPearl.Addresses
                .FirstOrDefault(a => a.AddressId == address.AddressId));
        }

        public int DeleteAddress(Domain.Address address)
        {
            var theAddress = _internalMapper.Map<DataAccess.Address>(address);
            _addAPearl.Addresses.Attach(theAddress);
            _addAPearl.Addresses
                .Remove(theAddress);
            return _addAPearl.SaveChanges();
        }
        #endregion

        #region Customers
        public async Task<IEnumerable<Domain.Customer>> GetCustomers()
        {
            _logger.LogInformation("Executing: IEnumerable<Domain.Customer> GetCustomers()");

            return await _addAPearl.Customers
                .Include(a => a.Address)
                .Include(a => a.Company)
                .ProjectTo<Domain.Customer>(_internalMapper.ConfigurationProvider)
                .ToListAsync();
        }

        public Domain.Customer GetCustomerById(int id)
        {
            return _internalMapper.Map<Domain.Customer>(_addAPearl.Customers
                .Include(a => a.Address)
                .Include(a => a.Company)
                .AsNoTracking()
                .FirstOrDefault(a => a.CustomerId == id));
        }

        public Domain.Customer AddCustomer(Domain.Customer customer)
        {
            _logger.LogInformation("Adding a Customer");
            var customerToAdd = _internalMapper.Map<DataAccess.Customer>(customer);
            _addAPearl.Customers.Add(customerToAdd);
            _addAPearl.SaveChanges();
            return _internalMapper.Map<Domain.Customer>(_addAPearl.Customers
                .Include(a => a.Address)
                .Include(a => a.Company)
                .FirstOrDefault(a => a.CustomerId == customerToAdd.CustomerId));
        }

        public Domain.Customer UpdateCustomer(Domain.Customer customer)
        {
            var theCustomer = _internalMapper.Map<DataAccess.Customer>(customer);
            var companyId = theCustomer.CompanyId;

            _addAPearl.Customers.Attach(theCustomer).State = EntityState.Modified;
            theCustomer.CompanyId = companyId; //for some reason this foreign key relationship was reverting to db value after attaching...
            _addAPearl.SaveChanges();

            return _internalMapper.Map<Domain.Customer>(_addAPearl.Customers
                .Include(a => a.Address)
                .Include(a => a.Company)
                .FirstOrDefault(a => a.CustomerId == customer.CustomerId));
        }

        public int DeleteCustomer(Domain.Customer customer)
        {
            var theCustomer = _internalMapper.Map<DataAccess.Customer>(customer);
            _addAPearl.Customers.Attach(theCustomer);
            _addAPearl.Customers
                .Remove(theCustomer);
            return _addAPearl.SaveChanges();
        }
        #endregion

        #region Items
        public async Task<IEnumerable<Domain.Item>> GetItems()
        {
            _logger.LogInformation("Executing: IEnumerable<Domain.Item> GetItems()");
            return await _addAPearl.Items
                .Include(a => a.Product)
                .Include(a => a.Owner)
                .Include(a => a.Customer)
                .ProjectTo<Domain.Item>(_internalMapper.ConfigurationProvider)
                .ToListAsync();
        }

        public Domain.Item GetItemById(int id)
        {
            var itemDto = _addAPearl.Items
                .Include(a => a.Product)
                .Include(a => a.Owner)
                .Include(a => a.Customer)
                .Include(a => a.SubItems)
                .AsNoTracking()
                .FirstOrDefault(a => a.ItemId == id);

            var subItems = _internalMapper.Map<ICollection<Domain.SubItem>>(itemDto.SubItems);

            var item = _internalMapper.Map<Domain.Item>(itemDto);
            item.SubItems = subItems;

            return item;
        }

        public IEnumerable<Domain.Item> GetItemsByOwnerId(int id)
        {
            var items = new List<Domain.Item>();
            var itemsDto = _addAPearl.Items
                .Include(a => a.Product)
                .Include(a => a.Owner)
                .Include(a => a.Customer)
                .Include(a => a.SubItems)
                .AsNoTracking()
                .Where(a => a.OwnerId == id);
            
            foreach (var itemDto in itemsDto)
            {
                var item = _internalMapper.Map<Domain.Item>(itemDto);
                var subItems = _internalMapper.Map<ICollection<Domain.SubItem>>(itemDto.SubItems);
                item.SubItems = subItems;
                items.Add(item);
            }
            return items.Any() ? items : null;
        }

        public Domain.Item AddItem(Domain.Item item)
        {
            _logger.LogInformation("Adding a Item");
            var itemToAdd = _internalMapper.Map<DataAccess.Item>(item);
            _addAPearl.Items.Add(itemToAdd);
            _addAPearl.SaveChanges();
            return _internalMapper.Map<Domain.Item>(itemToAdd);
        }

        public Domain.Item UpdateItem(Domain.Item item)
        {
            var theItem = _internalMapper.Map<DataAccess.Item>(item);
            _addAPearl.Items.Attach(theItem).State = EntityState.Modified;
            _addAPearl.SaveChanges();

            return _internalMapper.Map<Domain.Item>(_addAPearl.Items
                .FirstOrDefault(a => a.ItemId == item.ItemId));
        }

        public int DeleteItem(Domain.Item item)
        {
            var theItem = _internalMapper.Map<DataAccess.Item>(item);
            _addAPearl.Items.Attach(theItem);
            _addAPearl.Items
                .Remove(theItem);
            return _addAPearl.SaveChanges();
        }
        #endregion

        #region Products
        public async Task<IEnumerable<Domain.Product>> GetProducts()
        {
            _logger.LogInformation("Executing: IEnumerable<Domain.Product> GetProducts()");
            return await _addAPearl.Products
                .ProjectTo<Domain.Product>(_internalMapper.ConfigurationProvider)
                .ToListAsync();
        }

        public Domain.Product GetProductById(int id)
        {
            return _internalMapper.Map<Domain.Product>(_addAPearl.Products
                .AsNoTracking()
                .FirstOrDefault(a => a.ProductId == id));
        }

        public Domain.Product AddProduct(Domain.Product product)
        {
            _logger.LogInformation("Adding a Product");
            var productToAdd = _internalMapper.Map<DataAccess.Product>(product);
            _addAPearl.Products.Add(productToAdd);
            _addAPearl.SaveChanges();
            return _internalMapper.Map<Domain.Product>(productToAdd);
        }

        public Domain.Product UpdateProduct(Domain.Product product)
        {
            var theProduct = _internalMapper.Map<DataAccess.Product>(product);
            _addAPearl.Products.Attach(theProduct).State = EntityState.Modified;
            _addAPearl.SaveChanges();

            return _internalMapper.Map<Domain.Product>(_addAPearl.Products
                .FirstOrDefault(a => a.ProductId == product.ProductId));
        }

        public int DeleteProduct(Domain.Product product)
        {
            var theProduct = _internalMapper.Map<DataAccess.Product>(product);
            _addAPearl.Products.Attach(theProduct);
            _addAPearl.Products
                .Remove(theProduct);
            return _addAPearl.SaveChanges();
        }
        #endregion

        #region SubItems
        public async Task<IEnumerable<Domain.SubItem>> GetSubItems()
        {
            _logger.LogInformation("Executing: IEnumerable<Domain.SubItem> GetSubItems()");
            return await _addAPearl.SubItems
                .Include(a => a.Item)
                .Include(a => a.Product)
                .Include(a => a.Owner)
                .Include(a => a.Customer)
                .ProjectTo<Domain.SubItem>(_internalMapper.ConfigurationProvider)
                .ToListAsync();
        }

        public Domain.SubItem GetSubItemById(int id)
        {
            return _internalMapper.Map<Domain.SubItem>(_addAPearl.SubItems
                .Include(a => a.Item)
                .Include(a => a.Product)
                .Include(a => a.Owner)
                .Include(a => a.Customer)
                .AsNoTracking()
                .FirstOrDefault(a => a.SubItemId == id));
        }

        public Domain.SubItem AddSubItem(Domain.SubItem subitem)
        {
            _logger.LogInformation("Adding a SubItem");
            var subitemToAdd = _internalMapper.Map<DataAccess.SubItem>(subitem);
            _addAPearl.SubItems.Add(subitemToAdd);
            _addAPearl.SaveChanges();
            return _internalMapper.Map<Domain.SubItem>(subitemToAdd);
        }

        public Domain.SubItem UpdateSubItem(Domain.SubItem subitem)
        {
            var theSubItem = _internalMapper.Map<DataAccess.SubItem>(subitem);
            _addAPearl.SubItems.Attach(theSubItem).State = EntityState.Modified;
            _addAPearl.SaveChanges();

            return _internalMapper.Map<Domain.SubItem>(_addAPearl.SubItems
                .FirstOrDefault(a => a.SubItemId == subitem.SubItemId));
        }

        public int DeleteSubItem(Domain.SubItem subitem)
        {
            var theSubItem = _internalMapper.Map<DataAccess.SubItem>(subitem);
            _addAPearl.SubItems.Attach(theSubItem);
            _addAPearl.SubItems
                .Remove(theSubItem);
            return _addAPearl.SaveChanges();
        }
        #endregion
    }
}
