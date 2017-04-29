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

namespace AddAPearl.UnitTests
{
    public class AddAPearlService_CompaniesShould
    {
        private readonly AddAPearlService _addAPearlService;

        public AddAPearlService_CompaniesShould()
        {
            var options = new DbContextOptionsBuilder<AddAPearlContext>();
            options.UseSqlServer("data source=JLARDINOIS\\SQL2014;initial catalog=AddAPearl;persist security info=True;user id=sa;password=wh0r353;MultipleActiveResultSets=True;App=EntityFramework");
            var addAPearlContext = new AddAPearlContext(options.Options);
            var logger = new MockLogger<AddAPearlService>();

            _addAPearlService = new AddAPearlService(addAPearlContext, logger);
        }

        [Theory]
        [InlineData()]
        public async Task HasCompanyRecord()
        {
            var result = await _addAPearlService.GetCompanies();

            Assert.NotEmpty(result);
        }
    }

    public static class ApplicationLogging
    {
        public static ILoggerFactory LoggerFactory { get; } = new LoggerFactory();
        public static Microsoft.Extensions.Logging.ILogger CreateLogger<T>() =>
          LoggerFactory.CreateLogger<T>();
    }
}
