import {
  HexGrid,
  SingledCoord,
  toDoubledCoord,
  toSingledCoord,
} from '../models/hex-grid';
import { HexTile, Region } from '../models/hex-tile';

export class NoCellOptionsError extends Error {}

const coordInBounds = (coord: SingledCoord, gridSize: number) => {
  return (
    coord.x >= 0 && coord.x < gridSize && coord.y >= 0 && coord.y < gridSize
  );
};

const updateCellOptions = (
  grid: HexGrid,
  coord: SingledCoord,
  neighbour: { value: string; region: Region },
) => {
  if (coordInBounds(coord, grid.length)) {
    const cell = grid[coord.y][coord.x];
    if (cell instanceof HexTile) {
      return;
    }

    cell.forEach((cellOption) => {
      cellOption.validRotations = cellOption.tile.getValidTileRotations(
        neighbour,
        cellOption.validRotations,
      );
    });
    const newCell = cell.filter(
      (cellOption) => cellOption.validRotations.length > 0,
    );
    if (newCell.length === 0) {
      throw new NoCellOptionsError();
    }

    grid[coord.y][coord.x] = newCell;
  }
};

export const propagateCell = (grid: HexGrid, coord: SingledCoord) => {
  const rotatedTile = grid[coord.y][coord.x] as HexTile;
  const doubledCoord = toDoubledCoord(coord);

  // NW
  const NWCoord = toSingledCoord({
    x: doubledCoord.x - 1,
    y: doubledCoord.y - 1,
  });
  updateCellOptions(grid, NWCoord, {
    value: rotatedTile.regions.NW,
    region: 'SE',
  });

  // NE
  const NECoord = toSingledCoord({
    x: doubledCoord.x + 1,
    y: doubledCoord.y - 1,
  });
  updateCellOptions(grid, NECoord, {
    value: rotatedTile.regions.NE,
    region: 'SW',
  });

  // E
  const ECoord = toSingledCoord({
    x: doubledCoord.x + 2,
    y: doubledCoord.y,
  });
  updateCellOptions(grid, ECoord, {
    value: rotatedTile.regions.E,
    region: 'W',
  });

  // SE
  const SECoord = toSingledCoord({
    x: doubledCoord.x + 1,
    y: doubledCoord.y + 1,
  });
  updateCellOptions(grid, SECoord, {
    value: rotatedTile.regions.SE,
    region: 'NW',
  });

  // SW
  const SWCoord = toSingledCoord({
    x: doubledCoord.x - 1,
    y: doubledCoord.y + 1,
  });
  updateCellOptions(grid, SWCoord, {
    value: rotatedTile.regions.SW,
    region: 'NE',
  });

  // W
  const WCoord = toSingledCoord({
    x: doubledCoord.x - 2,
    y: doubledCoord.y,
  });
  updateCellOptions(grid, WCoord, {
    value: rotatedTile.regions.W,
    region: 'E',
  });
};
