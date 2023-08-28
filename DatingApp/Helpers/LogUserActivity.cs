using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Extensions;
using DatingApp.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if(!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            var userId = resultContext.HttpContext.User.GetUserId();
            var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
            var user = await repo.GetUserByIdAsync(userId);
            user.LastActive = DateTime.Now;
            await repo.SaveAllAsync();
            // -----------------------------
            // var resultContext = await next();
            // var username = resultContext.HttpContext.User.GetUsername();
            // if (username == null) return;
            // var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
            // if(repo == null) return;

            // var userId = resultContext.HttpContext.User.GetUserId();
            // var user = await repo.GetUserByIdAsync(userId);
            // user.LastActive = DateTime.UtcNow;
            // await repo.SaveAllAsync();
        }
    }
}