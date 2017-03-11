using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using AddAPearl.API;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Xunit;

namespace AddAPearl.IntegrationTests
{
    public class AddAPearlCompaniesControllerShould
    {
        private readonly IWebHostBuilder _webHostBuilder;
        private readonly TestServer _server;
        private readonly HttpClient _client;

        public AddAPearlCompaniesControllerShould()
        {
            // Arrange
            _webHostBuilder = new WebHostBuilder()
                .UseStartup<Startup>();
            _server = new TestServer(_webHostBuilder);
            _client = _server.CreateClient();
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                Formatting = Newtonsoft.Json.Formatting.Indented,
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            };
        }

        [Fact]
        public async Task HaveItems()
        {
            var response = await _client.GetAsync("/api/Companies");
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();

            var results = JsonConvert.DeserializeObject<IEnumerable<Domain.Company>>(responseString);


            Assert.NotEmpty(results);
        }
    }
}
