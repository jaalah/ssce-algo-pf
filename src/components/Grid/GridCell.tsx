import React from 'react';
import { CoordinateTypes, PathTypes, CellTypes } from '../../types';
import './Grid.css';

interface GridCellProps {
    cell: CellTypes;
    colIndex: number;
    end: CoordinateTypes;
    isPressed: boolean;
    onCellClick: (rowIndex: number, colInde: number) => () => void;
    path?: PathTypes;
    rowIndex: number;
    setCellWall: (coords: CoordinateTypes) => void;
    start: CoordinateTypes;
}

const GridCell: React.FC<GridCellProps> = React.memo(
    ({
        cell,
        colIndex,
        end,
        isPressed,
        onCellClick,
        path,
        rowIndex,
        setCellWall,
        start
    }) => {
        const isWall = path && path[rowIndex][colIndex]?.isWall;
        const isPath = path && path[rowIndex][colIndex]?.isPath;
        const isVisited = path && path[rowIndex][colIndex]?.fCost !== 0;
        const pathStyle = isPath ? 'gridCell--path' : '';
        const cellStatus = cell.status === 'empty' ? '' : `gridCell--${cell.status}`

        let cellType;
        switch (true) {
            case rowIndex === start.x && colIndex === start.y:
                cellType = 'gridCell--start';
                break;
            case rowIndex === end.x && colIndex === end.y:
                cellType = 'gridCell--end';
                break;
            case isWall:
                cellType = 'gridCell--wall';
                break;
            case isVisited:
                cellType = 'gridCell--visited';
                break;
            default:
                cellType = 'default';
        }

        return (
            <div
                key={`${rowIndex}-${colIndex}`}
                className={`gridCell ${cellType} ${cellStatus} ${pathStyle}`}
                onMouseEnter={() => {
                    if (isPressed) {
                        setCellWall({ x: rowIndex, y: colIndex });
                    }
                }}
                onClick={onCellClick(rowIndex, colIndex)}
            ></div>
        );
    }
);

export { GridCell };
