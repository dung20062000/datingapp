using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DatingApp.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

        public static int GetUserId(this ClaimsPrincipal user)
        {
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
        // public static int GetUserId(this ClaimsPrincipal user)
        // {
        //     var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);

        //     if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
        //     {
        //         return userId;
        //     }

        //     // Return a default or error value here, as appropriate for your application
        //     throw new InvalidOperationException("User ID claim is missing or invalid.");
        // }
    }
}