using Server.Entity;

namespace Server.Service
{
    public interface IUserService
    {
        User Create(User user); 
        User GetByEmail(string email);
        public User GetById(int id);

    }
}
