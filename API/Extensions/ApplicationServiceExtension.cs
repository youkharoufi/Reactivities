using System.Collections.Generic;
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{

        public static class ApplicationServiceExtensions
        {
            public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
                IConfiguration configuration)
            {
                services.AddEndpointsApiExplorer();
                services.AddSwaggerGen();

                services.AddDbContext<DataContext>(opt =>
                {
                    opt.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
                });

                services.AddCors(options =>
                {
                    options.AddPolicy("CorsPolicy",
                        builder => builder
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .WithOrigins("http://localhost:3001"));

                });

                services.AddMediatR(typeof(List.Handler));
                services.AddAutoMapper(typeof(MappingProfiles).Assembly);

                return services;
            }
        }

}
