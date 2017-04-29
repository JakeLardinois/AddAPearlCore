using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using AddAPearl.Domain;

namespace AddAPearl.UnitTests
{
    public class AddAPearlDomain_CompanyShould
    {

        [Theory]
        [InlineData(-1)]
        public void CheckCompanyValue(int value)
        {
            var result = new Company {CompanyName = "Foo Inc.", Email = "Foo@Manchu.com"};

            Assert.Equal(result.CompanyName, "Foo Inc.");
        }
    }
}
