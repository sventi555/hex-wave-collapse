import {
  CellOption,
  createHexGrid,
  toDoubledCoord,
  toSingledCoord,
} from './hex-grid';
import { ALL_ROTATIONS, HexTile } from './hex-tile';

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

describe('HexGrid', () => {
  describe('createHexGrid', () => {
    it('should create an NxN grid', () => {
      const hexGrid = createHexGrid(10, []);

      expect(hexGrid.length).toEqual(10);
      hexGrid.forEach((row) => {
        expect(row.length).toEqual(10);
      });
    });

    it('should set each cell in grid to have provided tile set as options', () => {
      const hexGrid = createHexGrid(2, [hexTile1, hexTile2]);

      hexGrid.forEach((row) => {
        row.forEach((cell) => {
          expect((cell as CellOption[])[0].tile.regions).toEqual(
            hexTile1.regions,
          );
          expect((cell as CellOption[])[1].tile.regions).toEqual(
            hexTile2.regions,
          );
        });
      });
    });

    it('should set every tile in each cell to have every rotation allowed by default', () => {
      const hexGrid = createHexGrid(2, [hexTile1, hexTile2]);

      hexGrid.forEach((row) => {
        row.forEach((cell) => {
          (cell as CellOption[]).forEach((cellOption) => {
            expect(cellOption.validRotations).toEqual(ALL_ROTATIONS);
          });
        });
      });
    });
  });

  describe('toDoubledCoord', () => {
    it('should convert even row coord to doubled coord', () => {
      expect(toDoubledCoord({ x: 0, y: 0 })).toEqual({ x: 0, y: 0 });
      expect(toDoubledCoord({ x: 1, y: 0 })).toEqual({ x: 2, y: 0 });
    });

    it('should convert odd row coord to doubled coord, offset by 1 in x axis', () => {
      expect(toDoubledCoord({ x: 0, y: 1 })).toEqual({ x: 1, y: 1 });
      expect(toDoubledCoord({ x: 1, y: 1 })).toEqual({ x: 3, y: 1 });
    });
  });

  describe('toSingledCoord', () => {
    it('should convert even row coord to singled coord', () => {
      expect(toSingledCoord({ x: 0, y: 0 })).toEqual({ x: 0, y: 0 });
      expect(toSingledCoord({ x: 2, y: 0 })).toEqual({ x: 1, y: 0 });
    });

    it('should convert odd row coord to singled coord', () => {
      expect(toSingledCoord({ x: 1, y: 1 })).toEqual({ x: 0, y: 1 });
      expect(toSingledCoord({ x: 3, y: 1 })).toEqual({ x: 1, y: 1 });
    });
  });
});
