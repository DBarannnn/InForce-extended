using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Server.Entity
{
    [Index(nameof(OriginalUrl), IsUnique = true)]
    public class Url
    {
        [Key]
        public int Id { get; set; }

        public string OriginalUrl { get; set; }
        public string ShortenedUrl { get; set; }

        
        public DateTime CreatedAt { get; set; }
        
        //Add user Owner
    }
}
