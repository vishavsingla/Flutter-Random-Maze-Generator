import React, { useState, useCallback } from 'react';

type Cell = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
};

type Maze = Cell[][];

const MazeGenerator: React.FC = () => {
  const [maze, setMaze] = useState<Maze>([]);
  const [size, setSize] = useState<number>(0);

  const generateMaze = useCallback(() => {
    const newSize = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
    setSize(newSize);

    const newMaze: Maze = Array(newSize).fill(null).map(() =>
      Array(newSize).fill(null).map(() => ({
        top: true,
        right: true,
        bottom: true,
        left: true,
      }))
    );

    // Create border walls
    for (let i = 0; i < newSize; i++) {
      newMaze[0][i].top = true;
      newMaze[newSize - 1][i].bottom = true;
      newMaze[i][0].left = true;
      newMaze[i][newSize - 1].right = true;
    }

    // Create openings
    const openings = [
      { side: Math.floor(Math.random() * 4), pos: Math.floor(Math.random() * newSize) },
      { side: Math.floor(Math.random() * 4), pos: Math.floor(Math.random() * newSize) },
    ];

    openings.forEach(opening => {
      switch (opening.side) {
        case 0: newMaze[0][opening.pos].top = false; break; // Top
        case 1: newMaze[opening.pos][newSize - 1].right = false; break; // Right
        case 2: newMaze[newSize - 1][opening.pos].bottom = false; break; // Bottom
        case 3: newMaze[opening.pos][0].left = false; break; // Left
      }
    });

    const stack: [number, number][] = [[0, 0]];
    const visited: boolean[][] = Array(newSize).fill(null).map(() => Array(newSize).fill(false));
    visited[0][0] = true;

    while (stack.length > 0) {
      const [y, x] = stack[stack.length - 1];
      const neighbors: [number, number, keyof Cell][] = [];

      if (y > 0 && !visited[y - 1][x]) neighbors.push([y - 1, x, 'top']);
      if (x < newSize - 1 && !visited[y][x + 1]) neighbors.push([y, x + 1, 'right']);
      if (y < newSize - 1 && !visited[y + 1][x]) neighbors.push([y + 1, x, 'bottom']);
      if (x > 0 && !visited[y][x - 1]) neighbors.push([y, x - 1, 'left']);

      if (neighbors.length > 0) {
        const [ny, nx, direction] = neighbors[Math.floor(Math.random() * neighbors.length)];
        newMaze[y][x][direction] = false;
        newMaze[ny][nx][getOppositeDirection(direction)] = false;
        visited[ny][nx] = true;
        stack.push([ny, nx]);
      } else {
        stack.pop();
      }
    }

    setMaze(newMaze);
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
        <div>
          {maze.map((row, y) => (
            <div key={y} className="flex">
              {row.map((cell, x) => (
                <div key={`${y}-${x}`} className="relative w-6 h-6">
                  {cell.top && <div className="absolute top-0 left-0 right-0 h-0.5 bg-black" />}
                  {cell.right && <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-black" />}
                  {cell.bottom && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
                  {cell.left && <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-black" />}
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