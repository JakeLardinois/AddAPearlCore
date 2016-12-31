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
            CreateMap<DataAccess.Address, IAddress>()
                .ReverseMap();

            CreateMap<DataAccess.Customer, Domain.Customer>()
                .ForMember(c => c.Address,
                    opt => opt.MapFrom(a => Mapper.Map<DataAccess.Address, Domain.Address>(a.Address)))
                .ForMember(c => c.Company,
                    opt => opt.MapFrom(a => Mapper.Map<DataAccess.Company, Domain.Company>(a.Company)))
                .ReverseMap();
        }
    }
}
