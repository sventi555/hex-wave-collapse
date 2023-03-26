import { ALL_ROTATIONS, HexTile, Rotation } from './hex-tile';

export interface Coord {
  x: number;
  y: number;
}
export type SingledCoord = Coord;
export type DoubledCoord = Coord;

export interface CellOption {
  tile: HexTile;
  validRotations: Rotation[];
}
export type Cell = CellOption[] | HexTile;
export type HexGrid = Cell[][];

export const createHexGrid = (size: number, tiles: HexTile[]): HexGrid => {
  const grid: HexGrid = [];

  for (let row = 0; row < size; row++) {
    const curRow: Cell[] = [];
    grid.push(curRow);

    for (let cell = 0; cell < size; cell++) {
      const curCell: CellOption[] = [];
      curRow.push(curCell);

      tiles.forEach((tile) => {
        curCell.push({
          tile: tile.clone(),
          validRotations: [...ALL_ROTATIONS],
        });
      });
    }
  }

  return grid;
};

export const toDoubledCoord = (coord: SingledCoord): DoubledCoord => {
  return {
    x: coord.x * 2 + (coord.y % 2),
    y: coord.y,
  };
};

export const toSingledCoord = (coord: DoubledCoord): SingledCoord => {
  return {
    x: (coord.x - (coord.y % 2)) / 2,
    y: coord.y,
  };
};
