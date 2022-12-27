import React from 'react';
import {
    CellTypes,
    CoordinateTypes,
    GridSizeTypes,
    Mode,
    PathTypes,
} from '../../types';
import { GridCell } from './GridCell';
import './Grid.css';

interface GridProps {
    end: CoordinateTypes;
    grid: CellTypes[][];
    gridSize: GridSizeTypes;
    mode: Mode;
    path?: PathTypes;
    setCellWall: (coordinates: CoordinateTypes) => void;
    setEnd: (coordinates: CoordinateTypes) => void;
    setStart: (coordinates: CoordinateTypes) => void;
    start: CoordinateTypes;
}

const Grid: React.FC<GridProps> = ({
    end,
    grid,
    gridSize,
    mode,
    path,
    setCellWall,
    setEnd,
    setStart,
    start
}) => {
    const [isPressed, setIsPressed] = React.useState<boolean>(false);

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);

    const onCellClick = (rowIndex: number, colIndex: number) => () => {
        if (mode === Mode.setWall) {
            setCellWall({ x: rowIndex, y: colIndex });
        } else if (mode === Mode.setStart) {
            setStart({ x: rowIndex, y: colIndex });
        } else if (mode === Mode.setEnd) {
            setEnd({ x: rowIndex, y: colIndex });
        }
    };

    return (
        <div className="grid" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
            {grid.map((row: CellTypes[], rowIndex: number) => (
                <div
                    className="grid-row"
                    style={{
                        gridTemplateColumns: `repeat(${gridSize.height}, 1fr)`
                    }}
                >
                    {row.map((cell: CellTypes, colIndex: number) => (
                        <GridCell
                          cell={cell}
                          colIndex={colIndex}
                          end={end}
                          isPressed={isPressed}
                          key={`${rowIndex}-${colIndex}`}
                          onCellClick={onCellClick}
                          path={path}
                          rowIndex={rowIndex}
                          setCellWall={setCellWall}
                          start={start}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export { Grid }
