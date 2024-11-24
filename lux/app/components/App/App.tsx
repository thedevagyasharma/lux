'use client';

import React, { useState } from 'react';
import Tools from '../Tools/Tools';
import Card from '../Card/Card';
import { uniqueRatios } from '@/app/utils/uniqueRatios';

import particlesConfig from '@/app/utils/particles-config';

const App = () => {
  const [selectedGradient, setSelectedGradient] = useState<{ id: string; colors: string[]; stops: number[] } | null>(null);
  const [ratioIndex, setRatioIndex] = useState(0);
  const [delta, setDelta] = useState(0);

  const handleGradientSelect = (newGradient: { id: string; colors: string[]; stops: number[] }) => {
    setSelectedGradient(newGradient);
  };

  return (
    <div className='app-container'>
      {/* <Particles params={particlesConfig} className='particles' /> */}
      <Tools
        selectedGradient={selectedGradient}
        onSelect={handleGradientSelect}
        ratioIndex={ratioIndex}
        onRatioChange={setRatioIndex}
        delta={delta}
        onDeltaChange={setDelta}
      />
    <Card gradient={selectedGradient} a={uniqueRatios[ratioIndex].a} b={uniqueRatios[ratioIndex].b} delta={delta} />
  </div>
  );
};

export default App;