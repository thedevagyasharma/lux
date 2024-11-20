import p5 from 'p5';
import { useRef, useEffect } from 'react';

const P5Sketch = ({ name, noiseIntensity }) => {
  const sketchRef = useRef(); // Reference for the container element

  useEffect(() => {
    const sketch = (p) => {
      let gradientColors;
      let lissajousParams;

      p.setup = () => {
        p.createCanvas(400, 400).parent(sketchRef.current); // Attach canvas to the container

        // Generate random Lissajous curve parameters
        lissajousParams = {
          a: p.int(p.random(1, 6)), // Random integers for frequency
          b: p.int(p.random(1, 6)),
          delta: p.random(0, p.TWO_PI), // Random phase difference
        };

        // Define gradient colors
        gradientColors = [
          p.color(p.random(100, 255), p.random(100, 255), p.random(100, 255)),
          p.color(p.random(100, 255), p.random(100, 255), p.random(100, 255)),
        ];
      };

      p.draw = () => {
        p.clear(); // Clear the canvas for redraw

        // Draw Gradient Background
        for (let y = 0; y < p.height; y++) {
          const inter = p.map(y, 0, p.height, 0, 1);
          const c = p.lerpColor(gradientColors[0], gradientColors[1], inter);
          p.stroke(c);
          p.line(0, y, p.width, y);
        }

        // Add Perlin Noise Overlay
        p.loadPixels();
        for (let x = 0; x < p.width; x++) {
          for (let y = 0; y < p.height; y++) {
            const index = (x + y * p.width) * 4;
            const noiseValue = p.noise(x * noiseIntensity + p.random(1000), y * noiseIntensity + p.random(1000)) * 255;
            p.pixels[index] += noiseValue;
            p.pixels[index + 1] += noiseValue;
            p.pixels[index + 2] += noiseValue;
          }
        }
        p.updatePixels();

        // Draw Lissajous Curve
        p.noFill();
        p.stroke(0);
        p.strokeWeight(2);
        const { a, b, delta } = lissajousParams;
        p.beginShape();
        for (let t = 0; t <= p.TWO_PI; t += 0.01) {
          const x = p.width / 2 + p.width / 3 * Math.sin(a * t + delta);
          const y = p.height / 2 + p.height / 3 * Math.sin(b * t);
          p.vertex(x, y);
        }
        p.endShape();

        // Draw User Name
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(20);
        p.text(name, p.width / 2, p.height - 30);
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, [name, noiseIntensity]);

  return <div ref={sketchRef}></div>;
};

export default P5Sketch;
