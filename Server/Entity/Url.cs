namespace Server.Entity
{
    public class Url
    {
        public int Id { get; set; }
        public string OriginalUrl { get; set; }
        public string ShortenedUrl { get; set; }

        
        public DateTime CreatedAt { get; set; }
        
        //Add user Owner
    }
}
