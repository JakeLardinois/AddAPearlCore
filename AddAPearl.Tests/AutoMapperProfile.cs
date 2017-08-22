using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace AddAPearl.Tests
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<DataAccess.Company, Domain.Company>()
                .ReverseMap();

            CreateMap<DataAccess.Address, Domain.Address>()
                .ReverseMap();

            CreateMap<DataAccess.Customer, Domain.Customer>()
                .ReverseMap();

            CreateMap<DataAccess.Item, Domain.Item>()
                .ForMember(dest => dest.SubItems,
                    opt => opt.Ignore())
                .ReverseMap();

            CreateMap<DataAccess.Product, Domain.Product>()
                .ReverseMap();

            CreateMap<DataAccess.SubItem, Domain.SubItem>()
                .ReverseMap();



            CreateMap<TestAsyncEnumerable<DataAccess.Company>, Domain.SubItem>()
                .ReverseMap();
        }
    }
}
