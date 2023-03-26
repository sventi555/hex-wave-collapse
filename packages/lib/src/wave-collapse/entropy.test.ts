import { Cell } from '../models/hex-grid';
import { HexTile } from '../models/hex-tile';
import { cellEntropy } from './entropy';

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

describe('cellEntropy', () => {
  it('should calculate the entropy of a cell as the sum of all possible tile rotations', () => {
    const cell: Cell = [
      { tile: hexTile1, validRotations: [0, 1, 2] },
      { tile: hexTile2, validRotations: [3, 5] },
    ];

    expect(cellEntropy(cell)).toEqual(5);
  });

  it('should be 0 if there are no tiles', () => {
    const cell: Cell = [];

    expect(cellEntropy(cell)).toEqual(0);
  });

  it('should be 0 if all tiles have no validRotations', () => {
    const cell: Cell = [
      { tile: hexTile1, validRotations: [] },
      { tile: hexTile2, validRotations: [] },
    ];

    expect(cellEntropy(cell)).toEqual(0);
  });

  it('should give a hex tile an entropy of 0', () => {
    expect(cellEntropy(hexTile1)).toEqual(0);
  });
});
