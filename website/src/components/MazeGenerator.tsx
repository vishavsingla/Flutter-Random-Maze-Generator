import React, { useState, useCallback } from 'react';

type Cell = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
};

type Maze = Cell[][];

type Opening = {
  x: number;
  y: number;
  side: 'top' | 'right' | 'bottom' | 'left';
};

const MazeGenerator: React.FC = () => {
  const [maze, setMaze] = useState<Maze>([]);
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [size, setSize] = useState<number>(0);

  const generateMaze = useCallback(() => {
    // Random size between 8 and 15 to create mazes
    const newSize = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
    setSize(newSize);

    // Initialize maze with all walls intact
    const newMaze: Maze = Array(newSize).fill(null).map(() =>
      Array(newSize).fill(null).map(() => ({
        top: true,
        right: true,
        bottom: true,
        left: true,
      }))
    );

    const stack: [number, number][] = [];
    const visited: boolean[][] = Array(newSize).fill(null).map(() => Array(newSize).fill(false));

    // Create two random openings for entry and exit
    const newOpenings: Opening[] = [];
    for (let i = 0; i < 2; i++) {
      const side = ['top', 'right', 'bottom', 'left'][Math.floor(Math.random() * 4)] as 'top' | 'right' | 'bottom' | 'left';
      let x, y;
      switch (side) {
        case 'top':
          x = Math.floor(Math.random() * newSize);
          y = 0;
          newMaze[y][x].top = false;
          break;
        case 'right':
          x = newSize - 1;
          y = Math.floor(Math.random() * newSize);
          newMaze[y][x].right = false;
          break;
        case 'bottom':
          x = Math.floor(Math.random() * newSize);
          y = newSize - 1;
          newMaze[y][x].bottom = false;
          break;
        case 'left':
          x = 0;
          y = Math.floor(Math.random() * newSize);
          newMaze[y][x].left = false;
          break;
      }
      newOpenings.push({ x, y, side });
    }

    // Start maze generation from the first opening
    const [startY, startX] = [newOpenings[0].y, newOpenings[0].x];
    visited[startY][startX] = true;
    stack.push([startY, startX]);

    // Depth-first search to generate the maze
    while (stack.length > 0) {
      const [y, x] = stack[stack.length - 1];
      const neighbors: [number, number, keyof Cell][] = [];

      // Check all four directions for unvisited neighbors
      if (y > 0 && !visited[y - 1][x]) neighbors.push([y - 1, x, 'top']);
      if (x < newSize - 1 && !visited[y][x + 1]) neighbors.push([y, x + 1, 'right']);
      if (y < newSize - 1 && !visited[y + 1][x]) neighbors.push([y + 1, x, 'bottom']);
      if (x > 0 && !visited[y][x - 1]) neighbors.push([y, x - 1, 'left']);

      if (neighbors.length > 0) {
        // Randomly choose a neighbor to ensure maze randomness
        const [ny, nx, direction] = neighbors[Math.floor(Math.random() * neighbors.length)];
        newMaze[y][x][direction] = false;
        newMaze[ny][nx][getOppositeDirection(direction)] = false;
        visited[ny][nx] = true;
        stack.push([ny, nx]);
      } else {
        // Backtrack if no unvisited neighbors
        stack.pop();
      }
    }

    setMaze(newMaze);
    setOpenings(newOpenings);
  }, []);

  const getOppositeDirection = (direction: keyof Cell): keyof Cell => {
    switch (direction) {
      case 'top': return 'bottom';
      case 'right': return 'left';
      case 'bottom': return 'top';
      case 'left': return 'right';
      default: return 'top';
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={generateMaze}
      >
        Generate New Maze
      </button>
      {size > 0 && (
        <div className="inline-block border-2 border-black">
          {maze.map((row, y) => (
            <div key={y} className="flex">
              {row.map((cell, x) => (
                <div key={`${y}-${x}`} className="relative w-6 h-6">
                  {cell.top && <div className="absolute top-0 left-0 right-0 h-0.5 bg-black" />}
                  {cell.right && <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-black" />}
                  {cell.bottom && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
                  {cell.left && <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-black" />}
                  {openings.map((opening, index) => 
                    opening.x === x && opening.y === y && (
                      <div 
                        key={index}
                        className={`absolute inset-0 ${
                          opening.side === 'top' || opening.side === 'bottom' 
                            ? 'border-l border-r' 
                            : 'border-t border-b'
                        } border-blue-500`} 
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MazeGenerator;