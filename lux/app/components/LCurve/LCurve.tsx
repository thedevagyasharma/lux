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
      <defs>
        <linearGradient id="gradientStroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={width} y2={height}>
          {gradient && gradient.colors.map((color, index) => (
            <stop key={index} offset={`${gradient.stops[index]}%`} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke="url(#gradientStroke)"
        strokeWidth="1"
      />
    </svg>
  );
};

export default LCurve;