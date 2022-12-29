import _range from 'lodash/range';
import _minBy from 'lodash/minBy';
import _remove from 'lodash/remove';
import { CoordinateTypes, CellTypes, VisitedCellTypes } from '../types';

// Description of A* Algorithm:
// A* is a small extension to Djiikstra's algorithm.
// It uses a heuristic function to estimate the distance from the current node
// to the destination node. The heuristic function is the Manhattan Distance
// which essentially says, "How far away is the destination node from the current node?"




// Mark all the vertices as not visited initially (Array or Set)
// Mark all nodes with infinite distance except the start node (Array or Map)
// Repeat the following steps (v-1) times until the destination node is reached:
// 1. Pick the minimum value node which is unprocessed and mark it as processed.
// 2. Update all adjacent nodes of the picked node with the minimum distance if the distance is less than the current distance.

// Data Structures:
// 1. We need to keep track of visited and unvisited nodes either using an array (O)n or a priority queue Set (O)1
// 2. We need to mark the distance of each node from the start node. We can use an array (O)n or a Map (O)1
// 3. We need to store the shortest path graph maintaining the parent child relationship. We can use an array (O)n or a Map (O)1



const generateGrid = <T extends { x: number; y: number; }>(numberOfRows: number, numberOfColumns: number, value: T): T[][] => {
  return _range(numberOfRows).map((x) =>
    _range(numberOfColumns).map((y) => ({ ...value, x, y })));
};

// All the coordinates around a cell to check for neighbors (clockwise)
const coordinatesToCheck: CoordinateTypes[] = [
  { y: 0, x: -1 },
  { y: 1, x: -1 },
  { y: 1, x: 0 },
  { y: 1, x: 1 },
  { y: 0, x: 1 },
  { y: -1, x: 1 },
  { y: -1, x: 0 },
  { y: -1, x: -1 },
];

// A* Algorithm: g(n) + h(n) = f(n)
// From the grid, we can get the g(n) and h(n) values
export const aStarAlgorithm = (start: number, end: number, g: any) => {
  const x = g[0].length;
  const y = g.length;

  const grid = generateGrid<VisitedCellTypes>(x, y, {
    fCost: 0,
    gCost: 0,
    hCost: 0,
    parent: undefined,
    isWall: false,
    isPath: false,
    x: 0,
    y: 0
  });
}


