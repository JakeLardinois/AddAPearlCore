namespace AddAPearl.Domain
{
    public class Company
    {
        public int CompanyId { get; set; }
        
        public string CompanyName { get; set; }

        public int? AddressId { get; set; }

        public Address Address { get; set; }
    }
}
