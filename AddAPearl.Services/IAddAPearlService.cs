using System.Collections.Generic;
using System.Threading.Tasks;

namespace AddAPearl.Services
{
    public interface IAddAPearlService
    {
        #region Companies
        Task<IEnumerable<Domain.Company>> GetCompaniesAsync();
        IEnumerable<Domain.Company> GetCompanies();
        Domain.Company GetCompanyById(int id);
        Domain.Company AddCompany(Domain.Company company);
        Domain.Company UpdateCompany(Domain.Company company);
        int DeleteCompany(Domain.Company company);
        #endregion

        #region Addresses
        Task<IEnumerable<Domain.Address>> GetAddresses();
        Domain.Address GetAddressById(int id);
        Domain.Address AddAddress(Domain.Address address);
        Domain.Address UpdateAddress(Domain.Address address);
        int DeleteAddress(Domain.Address address);
        #endregion

        #region Customers
        Task<IEnumerable<Domain.Customer>> GetCustomers();
        Domain.Customer GetCustomerById(int id);
        Domain.Customer AddCustomer(Domain.Customer customer);
        Domain.Customer UpdateCustomer(Domain.Customer customer);
        int DeleteCustomer(Domain.Customer customer);
        #endregion

        #region Items
        Task<IEnumerable<Domain.Item>> GetItems();
        Domain.Item GetItemById(int id);
        Domain.Item GetItemsByOwnerId(int id);
        Domain.Item AddItem(Domain.Item item);
        Domain.Item UpdateItem(Domain.Item item);
        int DeleteItem(Domain.Item item);
        #endregion

        #region Products
        Task<IEnumerable<Domain.Product>> GetProducts();
        Domain.Product GetProductById(int id);
        Domain.Product AddProduct(Domain.Product product);
        Domain.Product UpdateProduct(Domain.Product product);
        int DeleteProduct(Domain.Product product);
        #endregion

        #region SubItems
        Task<IEnumerable<Domain.SubItem>> GetSubItems();
        Domain.SubItem GetSubItemById(int id);
        Domain.SubItem AddSubItem(Domain.SubItem subitem);
        Domain.SubItem UpdateSubItem(Domain.SubItem subitem);
        int DeleteSubItem(Domain.SubItem subitem);
        #endregion
    }
}
