import { createHexGrid } from '../models/hex-grid';
import { HexTile } from '../models/hex-tile';
import { collapseCell } from './collapse';

const hexTile1 = new HexTile({
  NW: '0',
  NE: '1',
  E: '2',
  SE: '3',
  SW: '4',
  W: '5',
  C: '6',
});

const hexTile2 = new HexTile({
  NW: '6',
  NE: '5',
  E: '4',
  SE: '3',
  SW: '2',
  W: '1',
  C: '0',
});

describe('collapseCell', () => {
  it('should choose a cell option for the specified cell', () => {
    const grid = createHexGrid(2, [hexTile1, hexTile2]);

    collapseCell(grid, { x: 0, y: 0 });
    expect(grid[0][0]).toBeInstanceOf(HexTile);
  });
});
