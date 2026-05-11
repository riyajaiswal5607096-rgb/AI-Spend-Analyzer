# Architecture

## Project Structure

AI Spend Analyzer follows a simple frontend architecture:

- index.html → User interface structure
- style.css → Styling and responsive design
- script.js → Business logic and interactivity

## Core Functionalities

### Tool Management
Users can:
- Add AI tools
- Remove AI tools
- View total expenses

### Analytics
The dashboard calculates:
- Total monthly spend
- Estimated savings
- Efficiency score

### Data Persistence
LocalStorage is used to save tool data even after page refresh.

### Visualization
Chart.js is used to display expense distribution through a pie chart.