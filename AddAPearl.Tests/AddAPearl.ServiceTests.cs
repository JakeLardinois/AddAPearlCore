using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.DataAccess;
using AddAPearl.Services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Internal;
using Moq;
using Xunit;

namespace AddAPearl.Tests
{
    public class ServiceTests
    {
        private readonly IMapper _mapper;


        public ServiceTests()
        {
            _mapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            }).CreateMapper();
        }


        [Theory]
        [InlineData()]
        public async Task when_getting_companies_async_values_are_returned()
        {

            var mockRepository = new MockRepository(MockBehavior.Loose);
            var mockIAddAPearlContext = mockRepository.Create<IAddAPearlContext>();
            var mockILogger = mockRepository.Create<ILogger<AddAPearlService>>();

            mockILogger.Setup(l => l.Log(//defined tests for the ILogger...
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<FormattedLogValues>(v => v.ToString().Contains("Executing")), //a test against the logging message
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


            var addAPearlService = new AddAPearlService(mockIAddAPearlContext.Object, mockILogger.Object, _mapper);
            var result = await addAPearlService.GetCompaniesAsync();

            var enumerable = result as Domain.Company[] ?? result.ToArray();
            Assert.Equal(companies.Count(), enumerable.Count());
            Assert.IsType<Domain.Company>(enumerable.First());
            mockRepository.Verify(); //executes the tests defined in the Mock object's setup

        }

        [Theory]
        [InlineData()]
        public void when_getting_companies_values_are_returned()
        {
            var mockRepository = new MockRepository(MockBehavior.Strict);
            var mockIAddAPearlContext = mockRepository.Create<IAddAPearlContext>();
            var mockILogger = mockRepository.Create<ILogger<AddAPearlService>>();

            mockILogger.Setup(l => l.Log( //defined tests for the ILogger...
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<FormattedLogValues>(v => v.ToString().Contains("Executing")), //a test against the logging message
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

            var addAPearlService = new AddAPearlService(mockIAddAPearlContext.Object, mockILogger.Object, _mapper);
            var result = addAPearlService.GetCompanies();

            var enumerable = result as Domain.Company[] ?? result.ToArray();
            Assert.Equal(companies.Count(), enumerable.Count());
            Assert.IsType<Domain.Company>(enumerable.First());
            mockRepository.Verify(); //executes the tests defined in the Mock object's setup
        }
    }
}
