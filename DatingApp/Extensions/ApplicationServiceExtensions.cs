using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using DatingApp.Interfaces;
using DatingApp.Services;
using Microsoft.EntityFrameworkCore;
using DatingApp.Data;
using DatingApp.Helpers;
using AutoMapper;

namespace DatingApp.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService> ();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<LogUserActivity>();
            services.AddAutoMapper(typeof (AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            return services;
        }
    }
}