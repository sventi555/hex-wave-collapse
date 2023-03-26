import { CellOption, createHexGrid } from '../models/hex-grid';
import { HexTile } from '../models/hex-tile';
import { iterate } from './iterate';

const hexTile1 = new HexTile({
  NW: '0',
  NE: '1',
  E: '2',
  SE: '3',
  SW: '4',
  W: '5',
  C: '6',
});

describe('iterate', () => {
  it('should pick the next cell, collapse, and propagate', () => {
    const grid = createHexGrid(2, [hexTile1]);
    iterate(grid);

    expect(grid[0][0]).toBeInstanceOf(HexTile);
    expect((grid[0][1] as CellOption[])[0].validRotations.length).toEqual(1);
    expect((grid[1][0] as CellOption[])[0].validRotations.length).toEqual(1);
    expect((grid[1][1] as CellOption[])[0].validRotations.length).toEqual(6);
  });
});
