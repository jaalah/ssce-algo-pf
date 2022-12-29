// import { CoordinateTypes, CellTypes, VisitedCellTypes } from '../types';

// Problems with DjiKstra's algorithm:
// 1. It only cares about the shortest path, not the fastest path or which direction to go
// 2. If your graph doesn't look like a map like a uniform grid it's not optimal

// Pathfindinig algorithms are used in maps, satelite navigation, and routing algorithms.
// Djikstra is a greedy algorithm that finds the shortest path from a start node to an end node,
// although it's still a brute force algorithm. It's a weighted graph, meaning that each edge has a weight.

// We need three things to run Djikstra's algorithm:
// 1. A grid of nodes
// 2. A start node - distance 0
// 3. An end node - distance infinity

// Every other node has a distance of infinity which essentially means we haven't looked at those nodes yet.
// For Djikstra we have a priority queue of nodes that were X distance away from the start node, which the shortest distances at the top.
// While we're doing our search, we have to keep track of where we've been. We can do this by keeping track of the parent node.

// export const runAlgorithm = (grid: CellTypes[][], start: CoordinateTypes, end: CoordinateTypes): VisitedCellTypes[][] => {
//     const visited: VisitedCellTypes[][] = grid.map((row) => row.map((cell) => ({ ...cell, x: 0, y: 0, distance: Infinity })));
//     const unvisited: VisitedCellTypes[] = [];
//     const { x: endRow, y: endCol } = end;
//     const { x: startRow, y: startCol } = start;
//     const getNeighbors = (row: number, col: number): VisitedCellTypes[] => {
//         const neighbors: VisitedCellTypes[] = [];
//         const top = row - 1;
//         const bottom = row + 1;
//         const left = col - 1;
//         const right = col + 1;

//         if (top >= 0) {
//             neighbors.push(visited[top][col]);
//         }
//         if (bottom < visited.length) {
//             neighbors.push(visited[bottom][col]);
//         }
//         if (left >= 0) {
//             neighbors.push(visited[row][left]);
//         }
//         if (right < visited[0].length) {
//             neighbors.push(visited[row][right]);
//         }
//         return neighbors;
//     };

//     visited[startRow][startCol].distance = 0;
//     unvisited.push(visited[startRow][startCol]);

//     while (unvisited.length) {
//         unvisited.sort((a, b) => a.distance - b.distance);
//         const current = unvisited.shift();
//         if (current) {
//             const { x: currentRow, y: currentCol } = current;
//             if (currentRow === endRow && currentCol === endCol) {
//                 return visited;
//             }
//             if (current.distance === Infinity) {
//                 return visited;
//             }
//             getNeighbors(currentRow, currentCol).forEach((neighbor) => {
//                 const { x: neighborRow, y: neighborCol } = neighbor;
//                 const distance = visited[currentRow][currentCol].distance + 1;
//                 if (distance < neighbor.distance) {
//                     neighbor.distance = distance;
//                     neighbor.previous = current;
//                     unvisited.push(neighbor);
//                 }
//             });
//         }
//     }
//     return visited;
// }