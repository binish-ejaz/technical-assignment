# Technical Task
- Create a webpage for drawing rectangle SVG figure
- Near to the figure, display the perimeter of the figure

## Requirements
- The initial dimensions needs to be taken from the JSON file.
- The user should be able to resize the figure by mouse.
- Near the figure, display the perimeter of the figure.
- After resizing, system must update JSON file with new dimensions.

## Solution
### Backend
- `GetRectangle API`- this will read the dimensions from the JSON file(rectangle.json)
- `DrawRectangle API`- this will create the JSON file(rectangle.json)
- `UpdateRectangle API` - If file exists, this will update the rectangle when resized using the mouse.

### Frontend
- Change the port in `apiUrl` in environment.ts to match your local host port
- On page load, `GetRectangle` API is called to read the JSON file and get the rectangle dimensions. Use the swagger to call the DrawRectangle once to generate the JSON file(rectangle.json) with width and height of the rectangle.
- Once resized, click the `update` button to update the rectangle dimensions in JSON file.

