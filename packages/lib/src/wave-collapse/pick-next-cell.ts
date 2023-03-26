import { HexGrid, SingledCoord } from '../models/hex-grid';
import { cellEntropy } from './entropy';

export class NoMoreCellsError extends Error {}

// currently breaks ties by picking the one checked first
export const pickNextCell = (grid: HexGrid): SingledCoord => {
  let curCoord = { x: 0, y: 0 };
  let curLowestEntropy = Infinity;

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      const entropy = cellEntropy(cell);

      if (entropy > 0 && entropy < curLowestEntropy) {
        curCoord = { x, y };
        curLowestEntropy = entropy;
      }
    });
  });

  // All tiles are collapsed. Return null
  if (curLowestEntropy === Infinity) {
    throw new NoMoreCellsError();
  }

  return curCoord;
};
