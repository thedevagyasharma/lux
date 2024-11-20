'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import p5Sketch
const Sketch = dynamic(() => import('../utils/p5Sketch'), { ssr: false });

const Card = () => {
  const [name, setName] = useState('Your Name');
  const [noiseIntensity, setNoiseIntensity] = useState(0.1);
  const [lissajousParams, setLissajousParams] = useState({ a: 3, b: 2, delta: Math.PI / 2 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <Sketch name={name} noiseIntensity={noiseIntensity} lissajousParams={lissajousParams} />
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <div>
        <label>
          Noise Intensity:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={noiseIntensity}
            onChange={(e) => setNoiseIntensity(parseFloat(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default Card;
