import { Cell } from '../models/hex-grid';
import { HexTile } from '../models/hex-tile';

export const cellEntropy = (cell: Cell) => {
  if (cell instanceof HexTile) return 0;

  return cell.reduce((entropy, cellOption) => {
    return entropy + cellOption.validRotations.length;
  }, 0);
};
