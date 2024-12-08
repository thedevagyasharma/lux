import React from 'react';

interface LCurveProps {
  a: number;
  b: number;
  delta: number;
  width: number;
  height: number;
  gradient: { id: string; colors: string[]; stops: number[] } | null;
}

const LCurve: React.FC<LCurveProps> = ({ a, b, delta, width, height, gradient }) => {
  const points = [];

  for (let t = 0; t <= 2 * Math.PI+(Math.PI/4); t += 0.01) {
    const x = width / 2 + (width / 2 - 8) * Math.sin(a * t);
    const y = height / 2 + (height / 2 - 8) * Math.cos(b * t - delta);
    points.push(`${x},${y}`);
  }

  return (
    <svg width={width} height={height}>
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke="#ffffff" // White stroke
        strokeWidth="2"
      />
    </svg>
  );
};

export default LCurve;