using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.DataAccess;
using Xunit;
using AddAPearl.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Internal;
using Moq;

namespace AddAPearl.UnitTests
{
    /**Arrange**/
    /**Act**/
    /**Assert**/
    public class AddAPearlService_CompaniesShould
    {
        public AddAPearlService_CompaniesShould()
        {
            
        }

        [Theory]
        [InlineData()]
        public async Task HasCompanyRecord()
        {
            var mockRepository = new MockRepository(MockBehavior.Strict);
            var mockIAddAPearlContext = mockRepository.Create<IAddAPearlContext>();
            var mockILogger = mockRepository.Create<ILogger<AddAPearlService>>();

            mockILogger.Setup(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<FormattedLogValues>(v => v.ToString().Contains("Executing")),
                It.IsAny<Exception>(),
                It.IsAny<Func<object, Exception, string>>()
            ));

            var companies = new List<Company>
            {
                new Company { CompanyName = "My Foo Company"}
            }.AsQueryable();
            var mockCompanies = mockRepository.Create<DbSet<Company>>();
            mockCompanies.As<IQueryable<Company>>().Setup(m => m.Provider)
                .Returns(new TestAsyncQueryProvider<Company>(companies.Provider));
            mockCompanies.As<IQueryable<Company>>().Setup(m => m.Expression).Returns(companies.Expression);
            mockCompanies.As<IQueryable<Company>>().Setup(m => m.ElementType).Returns(companies.ElementType);
            mockCompanies.As<IAsyncEnumerable<Company>>().Setup(m => m.GetEnumerator())
                .Returns(new TestAsyncEnumerator<Company>(companies.GetEnumerator()));
            mockIAddAPearlContext.Setup(x => x.Companies)
                .Returns(mockCompanies.Object);

            var addAPearlService = new AddAPearlService(mockIAddAPearlContext.Object, mockILogger.Object);
            var result = await addAPearlService.GetCompanies();

            Assert.NotEmpty(result);
        }

        [Theory]
        [InlineData()]
        public void HasCompanyRecord2()
        {
            var mockRepository = new MockRepository(MockBehavior.Strict);
            var mockIAddAPearlContext = mockRepository.Create<IAddAPearlContext>();
            var mockILogger = mockRepository.Create<ILogger<AddAPearlService>>();

            mockILogger.Setup(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<FormattedLogValues>(v => v.ToString().Contains("Executing")),
                It.IsAny<Exception>(),
                It.IsAny<Func<object, Exception, string>>()
                ));

            var companies = new List<Company>
            {
                new Company { CompanyName = "My Foo Company"}
            }.AsQueryable();
            var mockCompanies = mockRepository.Create<DbSet<Company>>();
            mockCompanies.As<IQueryable<Company>>().Setup(m => m.Provider).Returns(companies.Provider);
            mockCompanies.As<IQueryable<Company>>().Setup(m => m.Expression).Returns(companies.Expression);
            mockCompanies.As<IQueryable<Company>>().Setup(m => m.ElementType).Returns(companies.ElementType);
            mockCompanies.As<IQueryable<Company>>().Setup(m => m.GetEnumerator()).Returns(companies.GetEnumerator());
            mockIAddAPearlContext.Setup(x => x.Companies)
                .Returns(mockCompanies.Object);

            var addAPearlService = new AddAPearlService(mockIAddAPearlContext.Object, mockILogger.Object);
            var result = addAPearlService.GetCompanies2();

            Assert.NotEmpty(result);
        }
    }
}
