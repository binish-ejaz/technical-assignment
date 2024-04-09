using System.Net;
using Technical.Task.Model;

namespace Technical.Task.API.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async System.Threading.Tasks.Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async System.Threading.Tasks.Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            _logger.LogError(exception, exception.Message);

            ExceptionResponse response = exception switch
            {
                ApplicationException => new ExceptionResponse(HttpStatusCode.BadRequest, exception.Message),
                KeyNotFoundException => new ExceptionResponse(HttpStatusCode.NotFound, exception.Message),
                FileNotFoundException => new ExceptionResponse(HttpStatusCode.NotFound, exception.Message),
                UnauthorizedAccessException => new ExceptionResponse(HttpStatusCode.Unauthorized, exception.Message),
                _ => new ExceptionResponse(HttpStatusCode.InternalServerError, exception.Message)
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)response.StatusCode;
            await context.Response.WriteAsJsonAsync(response);
        }
    }
}
