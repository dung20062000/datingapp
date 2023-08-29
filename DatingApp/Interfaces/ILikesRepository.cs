using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.DTOs;
using DatingApp.Entities;
using DatingApp.Helpers;

namespace DatingApp.Interfaces
{
    public interface ILikesRepository
    {
        
        Task<UserLike> GetUserLike(int sourceUserId, int LikedUserId);// tạo 1 tác vụ trả về 1 lượt thích của người dùng
        Task<AppUser> GetUserWithLikes(int userId);//trả về người dùng có lượt thích

        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);// trả về lượt thích của người dùng: lấy danhsachs người dùng đã liên kết 
    }
}