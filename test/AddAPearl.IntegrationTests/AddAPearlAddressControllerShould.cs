﻿using System;
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
    public class AddAPearlAddressControllerShould
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;

        public AddAPearlAddressControllerShould()
        {
            // Arrange
            _server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>()
            );
            _client = _server.CreateClient();
        }

        [Fact]
        public async Task HaveItems()
        {
            var response = await _client.GetAsync("/api/Addresses");
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();

            var results = JsonConvert.DeserializeObject<IEnumerable<Domain.Address>>(responseString);


            Assert.NotEmpty(results);
        }
    }
}
