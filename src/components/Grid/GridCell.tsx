import React from 'react';
import { GridCellProps } from '../../types';
import './Grid.css';

const GridCell = React.memo(
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
    }: GridCellProps) => {
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

        const handleMouseEnter = () => {
            if (isPressed) {
                setCellWall({ x: rowIndex, y: colIndex });
            }
        }

        return (
            <div
                key={`${rowIndex}-${colIndex}`}
                className={`gridCell ${cellType} ${cellStatus} ${pathStyle}`}
                onMouseEnter={handleMouseEnter}
                onClick={onCellClick(rowIndex, colIndex)}
            />
        );
    }
);

export { GridCell };
