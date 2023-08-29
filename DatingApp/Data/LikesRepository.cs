using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.DTOs;
using DatingApp.Entities;
using DatingApp.Interfaces;

namespace DatingApp.Data
{
    public class LikesRepository : ILikesRepository
    {
        public readonly DataContext _context;
        public LikesRepository(DataContext context) //đưa dữ liệu vào (DataContext) và khởi tạo dliêu (context)
        {
            _context = context;

        }

        public Task<UserLike> GetUserLike(int sourceUserId, int LikedUserId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId)
        {
            throw new NotImplementedException();
        }

        public Task<AppUser> GetUserWithLikes(int userId)
        {
            throw new NotImplementedException();
        }
    }
}