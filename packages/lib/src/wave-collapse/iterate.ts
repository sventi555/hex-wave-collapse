import { HexGrid } from '../models/hex-grid';
import { collapseCell } from './collapse';
import { pickNextCell } from './pick-next-cell';
import { propagateCell } from './propagate';

export const iterate = (grid: HexGrid) => {
  const nextCoord = pickNextCell(grid);
  collapseCell(grid, nextCoord);
  propagateCell(grid, nextCoord);
};
