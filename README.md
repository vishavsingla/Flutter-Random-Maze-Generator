# Random Maze Generator (React + Typescript + TailwindCSS)

## Overview
This project is a simple web application that generates random, solvable mazes. 

## Features
- Generates random mazes of sizes between 8x8 and 15x15
- Ensures all mazes are solvable
- Creates two random openings for entry and exit
- Provides a simple, intuitive user interface
- Implements maze generation logic from scratch without third-party libraries

## Technologies Used
- React
- TypeScript
- Tailwind CSS
- Bun

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Bun (latest version)

## Installation

1. Clone the repository: https://github.com/vishavsingla/Random-Maze-Generator

2. Navigate to the project directory: cd Random-Maze-Generator

3. Install the dependencies: bun install

## Running the Application

To run the application in development mode: 

1. Start the development server: bun run dev

2. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Usage

1. When you open the application, you'll see a "Generate New Maze" button.
2. Click the button to generate a new random maze.
3. The maze will be displayed below the button, with blue markers indicating the entry and exit points.
4. You can generate as many new mazes as you like by clicking the button again.

## Code Structure

- `src/MazeGenerator.tsx`: Contains the main component for generating and displaying mazes.
- `src/App.tsx`: The main application component that renders the MazeGenerator.
- `src/main.tsx`: The entry point of the application.

## Design Decisions

1. **Maze Generation Algorithm**: We used a depth-first search algorithm to generate the maze. This ensures that all generated mazes are solvable and creates interesting, winding paths.

2. **Random Sizing**: The maze size is randomly chosen between 8x8 and 15x15 to create varied and interesting mazes each time.

3. **React Hooks**: We utilized React's useState and useCallback hooks for efficient state management and to prevent unnecessary re-renders.

4. **TypeScript**: TypeScript was used to add static typing, improving code quality and developer experience.

5. **Tailwind CSS**: Tailwind was chosen for styling due to its utility-first approach, allowing for rapid UI development.

## Future Improvements

While the current implementation meets all the requirements, here are some potential areas for future enhancement:

1. Add difficulty levels (e.g., easy, medium, hard) that affect maze complexity.
2. Implement a visual solve feature to show the solution path.
3. Add animations to the maze generation process for a more engaging user experience.
4. Implement responsive design to better accommodate different screen sizes.
