import 'dart:math';
import 'package:flutter/material.dart';

class Cell {
  bool top;
  bool right;
  bool bottom;
  bool left;

  Cell({
    this.top = true,
    this.right = true,
    this.bottom = true,
    this.left = true,
  });

  void operator []=(String direction, bool value) {
    switch (direction) {
      case 'top':
        top = value;
        break;
      case 'right':
        right = value;
        break;
      case 'bottom':
        bottom = value;
        break;
      case 'left':
        left = value;
        break;
    }
  }
}

class Opening {
  final int x;
  final int y;
  final String side;

  const Opening({required this.x, required this.y, required this.side});
}

class MazeGenerator extends StatefulWidget {
  const MazeGenerator({super.key});

  @override
  State<MazeGenerator> createState() => _MazeGeneratorState();
}

class _MazeGeneratorState extends State<MazeGenerator> {
  List<List<Cell>> maze = [];
  List<Opening> openings = [];
  int size = 0;
  final Random random = Random();

  @override
  void initState() {
    super.initState();
    generateMaze();
  }

  void generateMaze() {
    size = random.nextInt(8) + 8;
    maze = List.generate(
      size,
      (y) => List.generate(size, (x) => Cell()),
    );

    List<List<bool>> visited = List.generate(
      size,
      (y) => List.generate(size, (x) => false),
    );

    List<List<int>> stack = [];
    openings = [];

    for (int i = 0; i < 2; i++) {
      String side = ['top', 'right', 'bottom', 'left'][random.nextInt(4)];
      int x = 0, y = 0;
      switch (side) {
        case 'top':
          x = random.nextInt(size);
          y = 0;
          maze[y][x].top = false;
          break;
        case 'right':
          x = size - 1;
          y = random.nextInt(size);
          maze[y][x].right = false;
          break;
        case 'bottom':
          x = random.nextInt(size);
          y = size - 1;
          maze[y][x].bottom = false;
          break;
        case 'left':
          x = 0;
          y = random.nextInt(size);
          maze[y][x].left = false;
          break;
      }
      openings.add(Opening(x: x, y: y, side: side));
    }

    int startY = openings[0].y;
    int startX = openings[0].x;
    visited[startY][startX] = true;
    stack.add([startY, startX]);

    while (stack.isNotEmpty) {
      List<int> current = stack.last;
      int y = current[0];
      int x = current[1];
      List<List<dynamic>> neighbors = [];

      if (y > 0 && !visited[y - 1][x]) neighbors.add([y - 1, x, 'top']);
      if (x < size - 1 && !visited[y][x + 1]) neighbors.add([y, x + 1, 'right']);
      if (y < size - 1 && !visited[y + 1][x]) neighbors.add([y + 1, x, 'bottom']);
      if (x > 0 && !visited[y][x - 1]) neighbors.add([y, x - 1, 'left']);

      if (neighbors.isNotEmpty) {
        List<dynamic> next = neighbors[random.nextInt(neighbors.length)];
        int ny = next[0];
        int nx = next[1];
        String direction = next[2];

        maze[y][x][direction] = false;
        maze[ny][nx][getOppositeDirection(direction)] = false;
        visited[ny][nx] = true;
        stack.add([ny, nx]);
      } else {
        stack.removeLast();
      }
    }

    setState(() {});
  }

  String getOppositeDirection(String direction) {
    switch (direction) {
      case 'top':
        return 'bottom';
      case 'right':
        return 'left';
      case 'bottom':
        return 'top';
      case 'left':
        return 'right';
      default:
        return 'top';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        ElevatedButton(
          onPressed: generateMaze,
          child: const Text('Generate New Maze'),
        ),
        const SizedBox(height: 20),
        if (size > 0)
          LayoutBuilder(
            builder: (context, constraints) {
              double availableSize = constraints.maxWidth;
              double borderWidth = 10.0; // Adjust this value to change the border width
              double mazeSize = availableSize - (borderWidth * 2);
              double cellSize = mazeSize / size;
              
              return Container(
                width: availableSize,
                height: availableSize,
                padding: EdgeInsets.all(borderWidth),
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.black, width: 2),
                ),
                child: CustomPaint(
                  painter: MazePainter(
                    maze: maze,
                    openings: openings,
                    cellSize: cellSize,
                  ),
                ),
              );
            },
          ),
      ],
    );
  }
}

class MazePainter extends CustomPainter {
  final List<List<Cell>> maze;
  final List<Opening> openings;
  final double cellSize;

  MazePainter({required this.maze, required this.openings, required this.cellSize});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.black
      ..strokeWidth = 1.0;

    for (int y = 0; y < maze.length; y++) {
      for (int x = 0; x < maze[y].length; x++) {
        if (maze[y][x].top) {
          canvas.drawLine(
            Offset(x * cellSize, y * cellSize),
            Offset((x + 1) * cellSize, y * cellSize),
            paint,
          );
        }
        if (maze[y][x].left) {
          canvas.drawLine(
            Offset(x * cellSize, y * cellSize),
            Offset(x * cellSize, (y + 1) * cellSize),
            paint,
          );
        }
        if (y == maze.length - 1 && maze[y][x].bottom) {
          canvas.drawLine(
            Offset(x * cellSize, (y + 1) * cellSize),
            Offset((x + 1) * cellSize, (y + 1) * cellSize),
            paint,
          );
        }
        if (x == maze[y].length - 1 && maze[y][x].right) {
          canvas.drawLine(
            Offset((x + 1) * cellSize, y * cellSize),
            Offset((x + 1) * cellSize, (y + 1) * cellSize),
            paint,
          );
        }
      }
    }

    final openingPaint = Paint()
      ..color = Colors.blue
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;

    for (var opening in openings) {
      canvas.drawRect(
        Rect.fromLTWH(
          opening.x * cellSize,
          opening.y * cellSize,
          cellSize,
          cellSize,
        ),
        openingPaint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}

class MazeApp extends StatelessWidget {
  const MazeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Maze Generator'),
        ),
        body: const Center(
          child: MazeGenerator(),
        ),
      ),
    );
  }
}

void main() {
  runApp(const MazeApp());
}