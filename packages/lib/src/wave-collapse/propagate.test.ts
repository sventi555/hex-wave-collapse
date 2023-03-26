import { CellOption, createHexGrid } from '../models/hex-grid';
import { ALL_ROTATIONS, HexTile } from '../models/hex-tile';
import { NoCellOptionsError, propagateCell } from './propagate';

const hexTile1 = new HexTile({
  NW: '0',
  NE: '1',
  E: '2',
  SE: '0',
  SW: '1',
  W: '2',
  C: '6',
});

const hexTile2 = new HexTile({
  NW: '7',
  NE: '8',
  E: '9',
  SE: '10',
  SW: '11',
  W: '12',
  C: '13',
});

describe('propagateCell', () => {
  it('should propagate the changes to the specified cell to direct neighbours', () => {
    const grid = createHexGrid(2, [hexTile1]);

    // collapse cell 0, 0 to be hexTile1 with rotation 0.
    grid[0][0] = hexTile1.clone();

    propagateCell(grid, { x: 0, y: 0 });

    // direct neighbours should be updated
    expect((grid[0][1] as CellOption[])[0].validRotations).toEqual([0, 3]);
    expect((grid[1][0] as CellOption[])[0].validRotations).toEqual([0, 3]);

    // all other cells should not be affected
    expect((grid[1][1] as CellOption[])[0].validRotations).toEqual(
      ALL_ROTATIONS,
    );
  });

  it('should remove tile once valid rotations are empty', () => {
    const grid = createHexGrid(2, [hexTile1, hexTile2]);

    // collapse cell 0, 0 to be hexTile1 with rotation 0
    grid[0][0] = hexTile1.clone();

    propagateCell(grid, { x: 0, y: 0 });

    // should remove hexTile2 from direct neighbours
    expect(grid[0][1]).toHaveLength(1);
    expect((grid[0][1] as CellOption[])[0].tile.regions).toEqual(
      hexTile1.regions,
    );
  });

  it('should throw if a cell is updated to have 0 options', () => {
    const grid = createHexGrid(2, [hexTile2]);

    // collapse cell 0, 0 to be hexTile2
    grid[0][0] = hexTile2.clone();
    propagateCell(grid, { x: 0, y: 0 });

    // collapse cell 1, 0 to be hexTile2
    grid[0][1] = hexTile2.clone().rotate(3);

    // no possible rotations for 0, 1
    expect(() => propagateCell(grid, { x: 1, y: 0 })).toThrow(
      NoCellOptionsError,
    );
  });
});
