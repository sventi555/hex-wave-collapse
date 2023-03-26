export type Region = 'NW' | 'NE' | 'E' | 'SE' | 'SW' | 'W' | 'C';
export const SIDE_REGIONS: Region[] = ['NW', 'NE', 'E', 'SE', 'SW', 'W'];

export const ALL_ROTATIONS = [0, 1, 2, 3, 4, 5] as const;
export type Rotation = (typeof ALL_ROTATIONS)[number];

export class HexTile {
  regions: Record<Region, string>;

  constructor(regions: Record<Region, string>) {
    this.regions = regions;
  }

  /**
   * rotates this HexTile by turning it `rotation` times clockwise.
   *
   * For each rotation, NW shifts to NE, NE shifts to E, etc.
   * C always stays the same.
   *
   * @param rotation the number of times the HexTile is turned
   * @return this
   */
  rotate = (rotation: Rotation) => {
    const outerFaces = [
      this.regions.NW,
      this.regions.NE,
      this.regions.E,
      this.regions.SE,
      this.regions.SW,
      this.regions.W,
    ];

    const rotatedFaces = [
      ...outerFaces.slice(-rotation),
      ...outerFaces.slice(0, -rotation),
    ];

    this.regions = {
      NW: rotatedFaces[0],
      NE: rotatedFaces[1],
      E: rotatedFaces[2],
      SE: rotatedFaces[3],
      SW: rotatedFaces[4],
      W: rotatedFaces[5],
      C: this.regions.C,
    };

    return this;
  };

  /**
   * getValidTileRotations returns a list of rotations this HexTile can use so that it
   * "snaps" to the provided neighbour. It "snaps" if the contacting sides have the same value.
   *
   * @param neighbour value of neighbouring side and the region it exists at relative to HexTile `h`
   * @param allowedRotations a candidate list to narrow down which rotations should be checked (and potentially returned)
   * @returns a list of valid rotations for HexTile `h`
   */
  getValidTileRotations = (
    neighbour: {
      value: string;
      region: Region;
    },
    allowedRotations: readonly Rotation[] = ALL_ROTATIONS,
  ): Rotation[] => {
    const validRotations: Rotation[] = [];

    allowedRotations.forEach((rotation) => {
      const rotated = this.clone().rotate(rotation);
      if (rotated.regions[neighbour.region] === neighbour.value)
        validRotations.push(rotation);
    });

    return validRotations;
  };

  clone = () => {
    return new HexTile({ ...this.regions });
  };
}
