# Maze Generator Project (Flutter + Web)

## Overview
This project consists of two parts: a Flutter mobile application and a web application, both designed to generate random, solvable mazes. The project showcases the versatility of implementing the same core functionality across different platforms.

## Project Structure
The project is divided into two main directories:

1. `/flutter_app`: Contains the Flutter mobile application
2. `/web_app`: Contains the web application (React + TypeScript)

## Features (Common to both apps)
- Generates random mazes of sizes between 8x8 and 15x15
- Ensures all mazes are solvable
- Creates two random openings for entry and exit
- Provides a clean, intuitive user interface
- Implements maze generation logic from scratch without third-party libraries

## Technologies Used

### Flutter App
- Flutter
- Dart

### Web App
- React
- TypeScript
- Tailwind CSS
- Bun

## Prerequisites
Ensure you have the following installed:

- Flutter SDK (latest stable version)
- Dart SDK (latest stable version)
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later) or Bun (latest version)
- Android Studio / VS Code with Flutter and React extensions

## Installation and Setup

### Flutter App

1. Navigate to the Flutter app directory:
   ```
   cd flutter_app
   ```

2. Get the dependencies:
   ```
   flutter pub get
   ```

3. Run the app:
   ```
   flutter run
   ```

### Web App

1. Navigate to the web app directory:
   ```
   cd web_app
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. Start the development server:
   ```
   bun run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

Both applications provide a similar user experience:

1. Open the application (mobile or web).
2. Click/Tap the "Generate New Maze" button.
3. A new random maze will be displayed, with blue markers indicating entry and exit points.
4. Generate new mazes as desired by clicking/tapping the button again.

## Code Structure

### Flutter App
- `flutter_app/lib/main.dart`: Entry point and main app structure
- `flutter_app/lib/maze_generator.dart`: MazeGenerator widget and maze generation logic

### Web App
- `web_app/src/MazeGenerator.tsx`: Main component for generating and displaying mazes
- `web_app/src/App.tsx`: Main application component
- `web_app/src/index.tsx`: Entry point of the web application

## Design Decisions

1. **Shared Core Logic**: The maze generation algorithm (depth-first search) is implemented similarly in both apps to ensure consistent behavior.

2. **Platform-Specific UI**: While the core functionality is the same, each app utilizes platform-specific UI components and best practices.

3. **Responsive Design**: Both apps adjust to different screen sizes, ensuring a good user experience across devices.

## Future Improvements

1. Implement a shared backend to store and retrieve mazes across platforms.
2. Add user accounts to save favorite mazes.
3. Introduce more maze generation algorithms and allow users to choose between them.
4. Add a competitive element, such as timed maze-solving challenges.

## Contributing

Contributions to either or both parts of the project are welcome. Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
