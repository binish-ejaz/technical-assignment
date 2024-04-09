using System.Text.Json;
using Technical.Task.Model;

namespace Technical.Task.Services
{
    public interface IRectangleService
    {
        public void DrawRectangle(Rectangle rectangle);
        public Rectangle GetRectangle();
        public void UpdateRectangle(Rectangle rectangle);
    }

    public class RectangleService : IRectangleService
    {
        public void DrawRectangle(Rectangle rectangle)
        {
            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonString = JsonSerializer.Serialize(rectangle, options);
            File.WriteAllText("rectangle.json", jsonString);
        }

        public Rectangle GetRectangle()
        {

            if(!System.IO.File.Exists("rectangle.json"))
            {
                throw new FileNotFoundException("File doesn't exist");
            }
            string jsonString = System.IO.File.ReadAllText("rectangle.json");
            Rectangle rectangle = JsonSerializer.Deserialize<Rectangle>(jsonString);
            return rectangle;
        }

        public void UpdateRectangle(Rectangle rectangle)
        {
            if (!System.IO.File.Exists("rectangle.json"))
            {
                throw new FileNotFoundException("File doesn't exist");
            }
            DrawRectangle(rectangle);
        }
    }
}