using Microsoft.EntityFrameworkCore;
using Server.DataContextConfig;
using Server.Entity;

namespace Server.Service
{
    public class UserService : IUserService
    {
        private readonly DataContext _dataContext;
        public UserService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public User Create(User user)
        {
            _dataContext.Users.Add(user);
            user.Id = _dataContext.SaveChanges();
            return user;
        }

        public User GetByEmail(string email)
        {
            return _dataContext.Users.First(user => user.Email.Equals(email));
        }

        public User GetById(int id)
        {
            return _dataContext.Users.FirstOrDefault(user => user.Id == id);
        }

    }
}
