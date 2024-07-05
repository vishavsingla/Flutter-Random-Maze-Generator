import { useCallback, useState } from "react";



type Cell = {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
}

type Maze = Cell[][]

type Opening = {
    x : number;
    y : number;
    side : 'top' | 'left' | 'bottom' | 'right';
}

const MazeGenerator : React.FC = () => {

    const [maze, setMaze] = useState<Maze>([]);
    const [openings, setOpenings] = useState<Opening[]>([]);
    const [size, setSize] = useState<number>(0);

    const generateMaze = useCallback(() => {
        const newSize = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
        setSize(newSize);

        const newMaze: Maze = Array(newSize).fill(null).map(() =>{
            Array(newSize).fill(null).map(() => ({
                top: true,
                bottom: true,
                left: true,
                right: true,
            }))
        }) 
    })

}
