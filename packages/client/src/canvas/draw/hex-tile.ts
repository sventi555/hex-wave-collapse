import { HexTile, SIDE_REGIONS } from 'lib';
import p5Types from 'p5';

export const HEX_TILE_WIDTH = 3 * Math.sqrt(3);
export const HEX_TILE_DIAG = 6;

const SMALL_TILE_WIDTH = HEX_TILE_WIDTH / 3;
const SMALL_TILE_DIAG = HEX_TILE_DIAG / 3;
const SMALL_TILE_SIDE_LEN = SMALL_TILE_DIAG / 2;

export const drawHexTile = (p5: p5Types, hexTile: HexTile) => {
  const diamondFill = '#FFF';

  p5.angleMode(p5.DEGREES);
  p5.strokeWeight(0);

  // draw diamonds
  p5.push();
  for (let i = 0; i < 6; i++) {
    p5.translate(0, -(HEX_TILE_DIAG / 2));
    drawSmallDiamond(p5, diamondFill);
    p5.translate(0, HEX_TILE_DIAG / 2);
    p5.rotate(60);
  }
  p5.pop();

  // draw side hexagons
  p5.push();
  p5.rotate(-30);
  for (let i = 0; i < 6; i++) {
    const region = SIDE_REGIONS[i];
    p5.translate(0, -(HEX_TILE_WIDTH / 2));
    drawSmallHexagon(p5, hexTile.regions[region]);
    p5.translate(0, HEX_TILE_WIDTH / 2);
    p5.rotate(60);
  }
  p5.pop();

  // draw center hexagon
  p5.push();
  p5.rotate(-30);
  p5.translate(0, -(SMALL_TILE_WIDTH / 2));
  drawSmallHexagon(p5, hexTile.regions.C);
  p5.pop();
};

const drawSmallDiamond = (p5: p5Types, color: string) => {
  p5.fill(color);

  p5.beginShape();
  p5.vertex(0, 0);
  p5.vertex(SMALL_TILE_WIDTH / 2, SMALL_TILE_DIAG / 4);
  p5.vertex(0, SMALL_TILE_DIAG / 2);
  p5.vertex(-(SMALL_TILE_WIDTH / 2), SMALL_TILE_DIAG / 4);
  p5.endShape(p5.CLOSE);
};

// flat side on top
const drawSmallHexagon = (p5: p5Types, color: string) => {
  p5.fill(color);

  p5.beginShape();
  p5.vertex(-(SMALL_TILE_SIDE_LEN / 2), 0);
  p5.vertex(SMALL_TILE_SIDE_LEN / 2, 0);
  p5.vertex(SMALL_TILE_DIAG / 2, SMALL_TILE_WIDTH / 2);
  p5.vertex(SMALL_TILE_SIDE_LEN / 2, SMALL_TILE_WIDTH);
  p5.vertex(-(SMALL_TILE_SIDE_LEN / 2), SMALL_TILE_WIDTH);
  p5.vertex(-SMALL_TILE_DIAG / 2, SMALL_TILE_WIDTH / 2);
  p5.endShape(p5.CLOSE);
};
