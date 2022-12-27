export interface ControlsProps {
    getPath: () => void;
    clearGrid: () => void;
    gridSize: GridSizeTypes;
    mode: Mode;
    setMode: (mode: Mode) => void;
    updateGridSize: (gridSize: GridSizeTypes) => void;
}

export interface GridProps {
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

export interface GridCellProps {
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

export interface ActionTypes<T = undefined> {
    payload?: T;
    type: string;
}

export interface CoordinateTypes {
    x: number;
    y: number;
}

export interface GridSizeTypes {
    height: number;
    width: number;
}

export type StatusTypes = 'empty' | 'block';

export enum Mode {
    setEnd,
    setStart,
    setWall
}

export type PathTypes = Array<Array<VisitedCellTypes | undefined>>;

export interface CellTypes {
    status: StatusTypes;
}

// f(n) = g(n) + h(n)
// n = next node on the path
export interface VisitedCellTypes {
    fCost: number; // sum of the above
    gCost: number; // g(n) is the cost of the path from the start node to n
    hCost: number; // h(n) is a heuristic function that estimates the cost of the cheapest path from n to the goal
    isPath: boolean;
    isWall: boolean;
    parent?: VisitedCellTypes;
    x: number;
    y: number;
}

export interface InitialStateTypes {
    end: CoordinateTypes;
    grid: CellTypes[][];
    gridSize: GridSizeTypes;
    mode: Mode;
    path?: VisitedCellTypes[][];
    start: CoordinateTypes;
}
