﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace AddAPearl.API.Infrastructure
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<DataAccess.Company, Domain.Company>()
                .ReverseMap();
            CreateMap<DataAccess.Company, Domain.Company>();
            CreateMap<Task<List<DataAccess.Company>>, Task<List<Domain.Company>>>()
                .ReverseMap();

            CreateMap<DataAccess.Address, Domain.Address>()
                .ReverseMap();
            CreateMap<DataAccess.Address, Domain.Address>()
                .ReverseMap();

            CreateMap<DataAccess.Customer, Domain.Customer>()
                .ReverseMap();
            CreateMap<DataAccess.Customer, Domain.Customer>();

            CreateMap<DataAccess.Item, Domain.Item>()
                .ForMember(dest => dest.SubItems,
                    opt => opt.Ignore())
                .ReverseMap();
            CreateMap<DataAccess.Item, Domain.Item>();

            CreateMap<DataAccess.Product, Domain.Product>()
                .ReverseMap();

            CreateMap<DataAccess.SubItem, Domain.SubItem>()
                .ReverseMap();
        }
    }
}
