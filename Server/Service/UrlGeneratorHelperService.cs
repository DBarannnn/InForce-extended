using Server.DataContextConfig;
using System.Runtime.InteropServices;

namespace Server.Service
{
    public class UrlGeneratorHelperService
    {
        private readonly DataContext _dataContext;
        private const string alphabet = "abcdefghijklmnopqrstuvwxyz";
        private Random _random = new Random();

        public UrlGeneratorHelperService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public bool validateUrl(string absoluteUrl)
        {
            return Uri.TryCreate(absoluteUrl, UriKind.Absolute, out _);
        }
        public async Task<string> generateUnique(string baseUrl, int n)
        {
            while (true)
            {
                var randomChars = new char[n];
                for (var i = 0; i < n; i++)
                {
                    var randIndex = _random.Next(n - 1);
                    randomChars[i] = alphabet[randIndex];
                }

                var uniquePart = new string(randomChars);
                var createdShortenedUrl = baseUrl + uniquePart;

                if (!_dataContext.Urls.Any(e => e.ShortenedUrl == createdShortenedUrl))
                {
                    return createdShortenedUrl;
                }
            }  
        }


    }
}
