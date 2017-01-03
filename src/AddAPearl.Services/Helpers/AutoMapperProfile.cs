using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddAPearl.Core;
using AutoMapper;

namespace AddAPearl.Services.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<DataAccess.Company, Domain.Company>()
                    .ForMember(c => c.Address,
                        opt => opt.MapFrom(a => Mapper.Map<DataAccess.Address, Domain.Address>(a.Address)))
                    .ReverseMap();

            CreateMap<DataAccess.Address, Domain.Address>()
                .ReverseMap();
            CreateMap<IAddress, DataAccess.Address>();

            CreateMap<DataAccess.Customer, Domain.Customer>()
                .ForMember(c => c.Address,
                    opt => opt.MapFrom(a => Mapper.Map<DataAccess.Address, Domain.Address>(a.Address)))
                .ForMember(c => c.Company,
                    opt => opt.MapFrom(a => Mapper.Map<DataAccess.Company, Domain.Company>(a.Company)))
                .ReverseMap();
            
            CreateMap<DataAccess.Item, Domain.Item>()
                .ForMember(i => i.Product,
                    opt => opt.MapFrom(a => Mapper.Map<DataAccess.Product, Domain.Product>(a.Product)))
                .ForMember(i => i.Owner,
                    opt => opt.MapFrom(a => Mapper.Map<DataAccess.Customer, Domain.Customer>(a.Owner)))
                .ForMember(i => i.Customer,
                    opt => opt.MapFrom(a => Mapper.Map<DataAccess.Customer, Domain.Customer>(a.Customer)))
                .ForMember(dest => dest.SubItems,
                    opt => opt.Ignore())
                .ReverseMap();

            CreateMap<DataAccess.Product, Domain.Product>()
                .ReverseMap();

            CreateMap<DataAccess.SubItem, Domain.SubItem>()
                .ForMember(s => s.Item,
                    opt => opt.MapFrom(a => Mapper.Map<DataAccess.Item, Domain.Item>(a.Item)))
                .ForMember(s => s.Product,
                    opt => opt.MapFrom(a => Mapper.Map<DataAccess.Product, Domain.Product>(a.Product)))
                .ForMember(s => s.Owner,
                    opt => opt.MapFrom(a => Mapper.Map<DataAccess.Customer, Domain.Customer>(a.Owner)))
                .ForMember(s => s.Customer,
                    opt => opt.MapFrom(a => Mapper.Map<DataAccess.Customer, Domain.Customer>(a.Customer)))
                .ReverseMap();
        }
    }
}
