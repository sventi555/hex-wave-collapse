import { CellOption, HexGrid, SingledCoord } from '../models/hex-grid';

const random = <T>(options: T[]) => {
  return options[Math.floor(Math.random() * options.length)];
};

export const collapseCell = (grid: HexGrid, coord: SingledCoord) => {
  const cell = grid[coord.y][coord.x] as CellOption[];

  const chosenOption = random(cell);
  const chosenRotation = random(chosenOption.validRotations);

  grid[coord.y][coord.x] = chosenOption.tile.rotate(chosenRotation);
};
