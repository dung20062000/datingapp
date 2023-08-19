using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Data;
using DatingApp.DTOs;
using DatingApp.Entities;
using DatingApp.Extensions;
using DatingApp.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        public readonly IUserRepository _userRepository;
        public readonly IMapper _mapper;
        public readonly IPhotoService _photoService;
        public UsersController(IUserRepository userRepository, 
                                IMapper mapper,
                                IPhotoService photoService
                                )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);

        }
        [Authorize]
        // api/users/3  link api
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);

        }
        
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);
            if(await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {   
            //lấy người dùng
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            //nhận kết quả ảnh và kiểm tra nó
            var result = await _photoService.AddPhotoAsync(file);
            
            if(result.Error != null ) return BadRequest(result.Error.Message);

            //tạo 1 ảnh mới nếu vượt qua các bước
            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            //kiểm tra neus chưa có ảnh thì đặt nó là ảnh đại diện
            if(user.Photos.Count == 0) 
            {
                photo.IsMain = true;
            }

            //lưu ảnh lại và trả về request
            user.Photos.Add(photo);
            if(await _userRepository.SaveAllAsync())
            {
                return _mapper.Map<PhotoDto>(photo);
            }
            return BadRequest("Problem adding photo");
        }
    }
}