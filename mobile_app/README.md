# Random Maze Generator

## Flutter Mobile App

### Overview
This Flutter application generates random, solvable mazes with a simple and intuitive user interface.

### Features
- Generates random mazes of sizes between 8x8 and 15x15
- Ensures all mazes are solvable
- Creates two random openings for entry and exit
- Provides a clean, responsive user interface
- Implements maze generation logic from scratch without third-party libraries

### Technologies Used
- Flutter
- Dart

### Prerequisites
Before you begin, ensure you have met the following requirements:
- Flutter SDK (latest stable version)
- Dart SDK (latest stable version)
- Android Studio / VS Code with Flutter extension

### Installation
Clone the repository:
```bash
git clone https://github.com/yourusername/flutter-maze-generator.git
cd flutter-maze-generator
flutter pub get
```

### Running the Application

To run the application on an emulator or physical device:

1. Ensure you have an emulator running or a physical device connected.
2. Open your terminal and navigate to the project directory.
3. Run the app using the following command:
   ```bash
   flutter run


### Usage
When you open the application, follow these steps:

You'll see a "Generate New Maze" button on the screen.
Tap the button to generate a new random maze.
The maze will be displayed below the button, with blue markers indicating the entry and exit points.
Repeat step 2 to generate new mazes as desired.


### Code Structure

The project structure is organized as follows:

1. ***lib/main.dart:*** This file serves as the entry point of the application and contains the main app structure.

2. ***lib/maze_generator.dart:*** Here you'll find the MazeGenerator widget, responsible for generating and displaying mazes. It includes all the necessary logic for maze generation.

