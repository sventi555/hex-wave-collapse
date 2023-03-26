import { CellOption, createHexGrid } from '../models/hex-grid';
import { HexTile } from '../models/hex-tile';
import { NoMoreCellsError, pickNextCell } from './pick-next-cell';

const hexTile1 = new HexTile({
  NW: '0',
  NE: '1',
  E: '2',
  SE: '3',
  SW: '4',
  W: '5',
  C: '6',
});

describe('pickNextCell', () => {
  it('should pick the cell coord (singled) with the lowest entropy', () => {
    const grid = createHexGrid(2, [hexTile1]);
    (grid[0][1] as CellOption[])[0].validRotations = [1, 5];

    expect(pickNextCell(grid)).toEqual({ x: 1, y: 0 });
  });

  it('should break ties by picking the first from top/down left/right', () => {
    const grid = createHexGrid(2, [hexTile1]);
    (grid[0][1] as CellOption[])[0].validRotations = [1, 5];
    (grid[1][0] as CellOption[])[0].validRotations = [3, 4];

    expect(pickNextCell(grid)).toEqual({ x: 1, y: 0 });
  });

  it('should throw NoMoreCellsError if all tiles are collapsed', () => {
    const grid = [
      [hexTile1, hexTile1],
      [hexTile1, hexTile1],
    ];
    expect(() => pickNextCell(grid)).toThrow(NoMoreCellsError);
  });
});
