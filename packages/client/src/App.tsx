import { createHexGrid, HexGrid, HexTile, iterate } from 'lib';
import p5Types from 'p5';
import Sketch from 'react-p5';
import { drawHexGrid } from './canvas/draw/hex-grid';

export const App = () => {
  let hexGrid: HexGrid;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(800, 800).parent(canvasParentRef);
    hexGrid = createHexGrid(10, [
      new HexTile({
        NW: '#000',
        NE: '#FFF',
        E: '#FFF',
        SE: '#FFF',
        SW: '#FFF',
        W: '#FFF',
        C: '#FFF',
      }),
    ]);
  };

  const draw = (p5: p5Types) => {
    p5.background(255);
    try {
      iterate(hexGrid);
    } catch (err) {
      p5.noLoop();
    }

    drawHexGrid(p5, hexGrid);
  };

  return <Sketch setup={setup} draw={draw} />;
};
