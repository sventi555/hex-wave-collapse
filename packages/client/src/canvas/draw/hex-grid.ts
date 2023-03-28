import { HexGrid, HexTile } from 'lib';
import p5Types from 'p5';
import { drawHexTile, HEX_TILE_DIAG, HEX_TILE_WIDTH } from './hex-tile';

export const drawHexGrid = (p5: p5Types, hexGrid: HexGrid) => {
  const DIM = hexGrid.length;

  p5.scale(p5.width / DIM / HEX_TILE_WIDTH);
  p5.translate(HEX_TILE_WIDTH / 2, HEX_TILE_DIAG / 2);

  hexGrid.forEach((row, y) => {
    p5.push();
    row.forEach((cell) => {
      if (cell instanceof HexTile) {
        drawHexTile(p5, cell);
      }
      p5.translate(HEX_TILE_WIDTH, 0);
    });
    p5.pop();
    p5.translate(
      (y % 2 === 0 ? 1 : -1) * (HEX_TILE_WIDTH / 2),
      HEX_TILE_DIAG * (3 / 4),
    );
  });
};
