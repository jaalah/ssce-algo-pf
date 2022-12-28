import _range from 'lodash/range';
import _cloneDeep from 'lodash/cloneDeep';
import {
    ActionTypes,
    CellTypes,
    CoordinateTypes,
    InitialStateTypes,
    Mode,
    StatusTypes
} from '../types';
import { computePath } from '../utils/algorithm';
import {
    SET_WALL,
    SET_MODE,
    SET_START,
    SET_END,
    GET_PATH,
    CLEAR_GRID,
    UPDATE_GRID_SIZE
} from './actions';

const DEFAULT_GRID_SIZE = 20;
const CELLS: CellTypes = { status: 'empty' };

const BuildGrid = (width: number, height: number): CellTypes[][] =>
    _range(width).map(() => _range(height).map(() => CELLS));

const initialState = (width: number, height: number): InitialStateTypes => ({
    end: { x: width - 1, y: height - 1 },
    grid: BuildGrid(width, height),
    gridSize: { width, height },
    mode: Mode.setWall,
    start: { x: 0, y: 0 }
});

const changeCellStatus = (
    state: InitialStateTypes,
    { x: row, y: col }: CoordinateTypes,
    status: StatusTypes
): InitialStateTypes => {
    const newState = _cloneDeep(state);
    newState.path = undefined;

    if (status === 'block' && newState.grid[row][col].status === 'block') {
        newState.grid[row][col] = { status: 'empty' };
    } else {
        newState.grid[row][col] = { status };
    }
    return newState;
};

const updateGrid = (state: InitialStateTypes): InitialStateTypes => {
    const base = initialState(state.gridSize.width, state.gridSize.height);

    return {
        ...base,
        grid: BuildGrid(state.gridSize.width, state.gridSize.height)
    };
};

const Reducer = (
    state: InitialStateTypes = initialState(DEFAULT_GRID_SIZE, DEFAULT_GRID_SIZE),
    action: ActionTypes<any>
): InitialStateTypes => {
    switch (action.type) {
        case SET_WALL:
            return changeCellStatus(state, action.payload, 'block');
        case SET_MODE:
            return { ...state, mode: action.payload };
        case SET_START:
            return {
                ...state,
                start: action.payload,
                mode: Mode.setWall,
                path: undefined
            };
        case SET_END:
            return {
                ...state,
                end: action.payload,
                mode: Mode.setWall,
                path: undefined
            };
        case GET_PATH:
            return {
                ...state,
                path: computePath(state.grid, state.start, state.end)
            };
        case CLEAR_GRID:
            return updateGrid(state);
        case UPDATE_GRID_SIZE:
            return updateGrid({ ...state, gridSize: action.payload });
        default:
            return state;
    }
};

export default Reducer;
