import { HexTile } from './hex-tile';

const hexTile1 = new HexTile({
  NW: '0',
  NE: '1',
  E: '2',
  SE: '3',
  SW: '4',
  W: '5',
  C: '6',
});

describe('HexTile', () => {
  describe('rotateTile', () => {
    it('can be rotated n times', () => {
      const h = hexTile1.clone();
      expect(h.rotate(2).regions).toEqual({
        NW: '4',
        NE: '5',
        E: '0',
        SE: '1',
        SW: '2',
        W: '3',
        C: '6',
      });
    });
  });

  describe('getValidTileRotations', () => {
    it('should return updated valid rotations given neighbour value', () => {
      const h = hexTile1;

      // can be rotated 180 degrees so the top is on bottom (facing South)
      expect(
        h.getValidTileRotations({
          value: hexTile1.regions.NE,
          region: 'SW',
        }),
      ).toEqual([3]);
    });

    it('should use the allowedRotations to narrow search', () => {
      const h = hexTile1;

      // only valid rotation is 3 - not part of allowed rotations
      expect(
        h.getValidTileRotations(
          { value: hexTile1.regions.NE, region: 'SW' },
          [0, 1, 2],
        ),
      ).toEqual([]);
    });

    it('should return empty list when none are possible', () => {
      const h = hexTile1;

      // neighbour value does not appear on any of the tile sides
      expect(h.getValidTileRotations({ value: 'beef', region: 'SW' })).toEqual(
        [],
      );
    });
  });
});
