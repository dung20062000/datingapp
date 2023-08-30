using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.DTOs;
using DatingApp.Entities;
using DatingApp.Helpers;

namespace DatingApp.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message); //thêm tin nhắn
        void DeleteMessage(Message message); //xóa tin nhắn
        Task<Message> GetMessage(int id); //nhận tin nhắn riêng 
        Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams); //llấy tin nhắn cho người dùng
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername); //
        Task<bool> SaveAllAsync(); //


    }
}