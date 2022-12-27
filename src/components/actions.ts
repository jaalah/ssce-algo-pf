import { CoordinateTypes, ActionTypes, Mode, GridSizeTypes } from '../types';

export const SET_WALL = 'SET_WALL';
export const SET_START = 'SET_START';
export const SET_END = 'SET_END';
export const SET_CELL_AS_EMPTY = 'SET_CELL_AS_EMPTY';
export const SET_CELL_AS_SEARCHED = 'SET_CELL_AS_SEARCHED';
export const SET_MODE = 'SET_MODE';
export const GET_PATH = 'GET_PATH';
export const CLEAR_GRID = 'CLEAR_GRID';
export const UPDATE_GRID_SIZE = 'UPDATE_GRID_SIZE';

export const setCellWall = (payload: CoordinateTypes): ActionTypes<CoordinateTypes> => ({
  type: SET_WALL,
  payload
});

export const setMode = (payload: Mode): ActionTypes<Mode> => ({
  type: SET_MODE,
  payload
});

export const setStart = (payload: CoordinateTypes): ActionTypes<CoordinateTypes> => ({
  type: SET_START,
  payload
});

export const setEnd = (payload: CoordinateTypes): ActionTypes<CoordinateTypes> => ({
  type: SET_END,
  payload
});

export const getPath = (): ActionTypes => ({
  type: GET_PATH
});

export const clearGrid = (): ActionTypes => ({
  type: CLEAR_GRID,
});

export const updateGridSize = (payload: GridSizeTypes): ActionTypes<GridSizeTypes> => ({
  type: UPDATE_GRID_SIZE,
  payload
});
