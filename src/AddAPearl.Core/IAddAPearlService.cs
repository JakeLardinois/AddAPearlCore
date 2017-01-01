using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AddAPearl.Core
{
    public interface IAddAPearlService
    {
        #region Companies
        IEnumerable<ICompany> GetCompanies();
        ICompany GetCompanyById(int id);
        ICompany AddCompany(ICompany company);
        ICompany UpdateCompany(ICompany company);
        int DeleteCompany(ICompany company);
        #endregion

        #region Addresses
        IEnumerable<IAddress> GetAddresses();
        IAddress GetAddressById(int id);
        IAddress AddAddress(IAddress address);
        IAddress UpdateAddress(IAddress address);
        int DeleteAddress(IAddress address);
        #endregion

        #region Customers
        IEnumerable<ICustomer> GetCustomers();
        ICustomer GetCustomerById(int id);
        ICustomer AddCustomer(ICustomer customer);
        ICustomer UpdateCustomer(ICustomer customer);
        int DeleteCustomer(ICustomer customer);
        #endregion

        #region Items
        IEnumerable<IItem> GetItems();
        IItem GetItemById(int id);
        IItem AddItem(IItem item);
        IItem UpdateItem(IItem item);
        int DeleteItem(IItem item);
        #endregion

        #region Products
        IEnumerable<IProduct> GetProducts();
        IProduct GetProductById(int id);
        IProduct AddProduct(IProduct product);
        IProduct UpdateProduct(IProduct product);
        int DeleteProduct(IProduct product);
        #endregion

        #region SubItems
        IEnumerable<ISubItem> GetSubItems();
        ISubItem GetSubItemById(int id);
        ISubItem AddSubItem(ISubItem subitem);
        ISubItem UpdateSubItem(ISubItem subitem);
        int DeleteSubItem(ISubItem subitem);
        #endregion
    }
}
