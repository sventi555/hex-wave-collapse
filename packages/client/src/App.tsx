import { createHexGrid, HexGrid, HexTile, iterate } from 'lib';
import p5Types from 'p5';
import Sketch from 'react-p5';
import { drawHexGrid } from './canvas/draw/hex-grid';

export const App = () => {
  let hexGrid: HexGrid;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(1000, 1000).parent(canvasParentRef);
    hexGrid = createHexGrid(20, [
      new HexTile({
        NW: '#000',
        NE: '#000',
        E: '#000',
        SE: '#000',
        SW: '#000',
        W: '#000',
        C: '#000',
      }),
      new HexTile({
        NW: '#000',
        NE: '#FFF',
        E: '#FFF',
        SE: '#FFF',
        SW: '#FFF',
        W: '#FFF',
        C: '#000',
      }),
      new HexTile({
        NW: '#000',
        NE: '#000',
        E: '#FFF',
        SE: '#FFF',
        SW: '#FFF',
        W: '#FFF',
        C: '#000',
      }),
      new HexTile({
        NW: '#000',
        NE: '#FFF',
        E: '#000',
        SE: '#FFF',
        SW: '#FFF',
        W: '#FFF',
        C: '#000',
      }),
      new HexTile({
        NW: '#000',
        NE: '#FFF',
        E: '#FFF',
        SE: '#000',
        SW: '#FFF',
        W: '#FFF',
        C: '#000',
      }),
      new HexTile({
        NW: '#000',
        NE: '#FFF',
        E: '#000',
        SE: '#FFF',
        SW: '#000',
        W: '#FFF',
        C: '#000',
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
