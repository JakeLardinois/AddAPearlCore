using AddAPearl.Core;

namespace AddAPearl.Domain
{
    public class Address: IAddress
    {
        public int AddressId { get; set; }
        
        public string AddressLine1 { get; set; }
        
        public string AddressLine2 { get; set; }
        
        public string AddressLine3 { get; set; }
        
        public string City { get; set; }
        
        public string State { get; set; }
        
        public string ZipCode { get; set; }
    }
}
