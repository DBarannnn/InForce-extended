using Microsoft.AspNetCore.Mvc;

namespace Server.Helper
{
    public static class ErrorBuilder
    {
        public static ObjectResult BuildErrorResponse(string errorMessage, int statusCode = StatusCodes.Status400BadRequest)
        {
            var errorResponse = new { msg = errorMessage };
            return new ObjectResult(errorResponse)
            {
                StatusCode = statusCode
            };
        }
    }
}
