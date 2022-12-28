import _range from 'lodash/range';
import _minBy from 'lodash/minBy';
import _remove from 'lodash/remove';
import { CoordinateTypes, CellTypes, VisitedCellTypes } from '../types';

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

// Manhattan Distance
const getDistance = (a: CoordinateTypes | VisitedCellTypes, b: CoordinateTypes | VisitedCellTypes) => {
  // colOffset is the number of columns between the two cells
  const colOffset = Math.abs(a.y - b.y);
  // rowOffset is the number of rows between the two cells
  const rowOffset = Math.abs(a.x - b.x);
  // The number of straight segments is the minimum of the two offsets
  const numberOfStraightSegments = Math.abs(colOffset - rowOffset);
  // The number of diagonal segments is the maximum of the two offsets minus the number of straight segments
  const numberOfDiagonalSegments = Math.max(colOffset, rowOffset) - numberOfStraightSegments;

  // The total distance is the number of straight segments multiplied by 10 and the number of diagonal segments multiplied by 14
  return numberOfStraightSegments * 10 + numberOfDiagonalSegments * 14; // 14 ~ 10 * sqrt(2)
}

export const computePath = (mainGrid: CellTypes[][], start: CoordinateTypes, end: CoordinateTypes): VisitedCellTypes[][] => {
  const gridLength = mainGrid.length;
  // Open list is the list of cells that have been visited but not yet checked
  let openList: VisitedCellTypes[] = [];

  // Generate a grid of cells
  const grid = generateGrid<VisitedCellTypes>(gridLength, gridLength, {
    fCost: 0,
    gCost: 0,
    hCost: 0,
    parent: undefined,
    isWall: false,
    isPath: false,
    x: 0,
    y: 0
  });

  // Add the start cell to the open list
  openList.push(grid[start.x][start.y]);

  // While there are still cells to check
  while (openList.length > 0) {
    // Get the cell with the lowest fCost
    const currentCell = _minBy(openList, c => c.fCost);

    if (!currentCell) {
      // No path found
      return grid;
    }

    // If the current cell is the end cell, we have found the path
    if (currentCell.x === end.x && currentCell.y === end.y) {
      let curr = currentCell;

      // Backtrack to find the path from the start cell to the end cell
      while (curr.parent) {
        grid[curr.x][curr.y].isPath = true;
        curr = curr.parent;
      }

      // Return the grid with the path
      return grid;
    }

    // Remove the current cell from the open list
    _remove(openList, c => (c.x === currentCell.x && c.y === currentCell.y));

    // Add the current cell to the closed list
    currentCell.isWall = true;

    // Check the neighbors of the current cell and add them to the open list if they are not already in it
    // eslint-disable-next-line no-loop-func
    coordinatesToCheck.forEach(coordinatesToCheck => {
      const { x, y }: CoordinateTypes = { x: currentCell.x + coordinatesToCheck.x, y: currentCell.y + coordinatesToCheck.y };

      // If the neighbor is outside the grid, ignore it and continue to the next neighbor
      if (
        x < 0 ||
        x >= gridLength ||
        y < 0 ||
        y >= gridLength
        || (start.x === x && start.y === y) ||
        grid[x][y].isWall ||
        mainGrid[x][y].status === 'block') {
        return;
      }

      const neighborCell = grid[x][y];
      const gCost = currentCell.gCost + getDistance(currentCell, neighborCell);
      let gCostIsBest = false;

      // If the neighbor is not in the open list, add it. Else if the gCost is better than the neighbor's gCost, update the neighbor's gCost
      if (!openList.find(c => c.x === x && c.y === y)) {
        gCostIsBest = true;
        neighborCell.hCost = getDistance(neighborCell, end);
        openList.push(neighborCell);
      } else if (gCost < neighborCell.gCost) {
        gCostIsBest = true;
      }

      // If the gCost is the best, update the neighbor's parent and gCost
      if (gCostIsBest) {
        neighborCell.parent = currentCell;
        neighborCell.gCost = gCost;
        neighborCell.fCost = neighborCell.gCost + neighborCell.hCost;
      }
    });
  }
  // No path found
  return grid;
};

