using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace Server.Entity
{
    public class User
    {
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public string Password { get; set; }

        public List<Url>? Urls { get; set; }
    }
}
