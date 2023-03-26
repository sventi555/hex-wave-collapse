import { HexTile } from 'lib';
import p5Types from 'p5';
import Sketch from 'react-p5';
import { drawHexTile } from './hex-tile';

export const App = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(800, 800).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(255);
    p5.translate(p5.width / 2, p5.height / 2);
    p5.scale(50);
    drawHexTile(
      p5,
      new HexTile({
        NW: '#000',
        NE: '#222',
        E: '#444',
        SE: '#666',
        SW: '#888',
        W: '#AAA',
        C: '#CCC',
      }),
    );
  };

  return <Sketch setup={setup} draw={draw} />;
};
