using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Core;
using AddAPearl.DataAccess;
using AddAPearl.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;

namespace AddAPearl.API
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var corsBuilder = new CorsPolicyBuilder();
            corsBuilder.AllowAnyHeader();
            corsBuilder.AllowAnyMethod();
            corsBuilder.AllowAnyOrigin();
            corsBuilder.AllowCredentials();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", corsBuilder.Build());
            });

            services.AddTransient<IAddAPearlService, AddAPearlService>();

            services.AddDbContext<AddAPearlContext>(
                options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseCors("AllowAll");

            //Adds a logger that will log to console when .netCore is running from command line. The configuration is pulled from appsettings.json
            loggerFactory
                .AddConsole(Configuration.GetSection("Logging"));

            /*Adds a logger that logs to Visual Studio's Output window when IIS Express is used by using the System.Diagnostics.Debug Class.
             * Note that you have to specify a default level in the AddDebug method otherwise the default level of 'Information' is used. */
            loggerFactory
                .WithFilter(new FilterLoggerSettings
                {
                    { "Microsoft", LogLevel.Debug },
                    { "System", LogLevel.Debug },
                    { "AddAPearl", LogLevel.Debug }
                })
                .AddDebug(LogLevel.Trace);

            //add NLog to ASP.NET Core
            loggerFactory.AddNLog();

            app.UseMvc();
            
        }
        
    }
}
