'use client';

import React, { useEffect, useState } from 'react';
import Tools from '../Tools/Tools';

import { Container } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { GRADIENTS } from '@/app/utils/gradients'; // Import the gradients list
import './App.css';

const App = () => {
  const [selectedGradient, setSelectedGradient] = useState(GRADIENTS[0]);
  const [ratioIndex, setRatioIndex] = useState(0);
  const [delta, setDelta] = useState(0);
  const [text, setText] = useState('Enter Text'); // State to hold the text field value
  const [init, setInit] = useState(false);

  

  const handleGradientSelect = (newGradient: { id: string; colors: string[]; stops: number[] }) => {
    setSelectedGradient(newGradient);
  };

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  return (
    <div className='app-container'>
      <Tools
        selectedGradient={selectedGradient}
        onSelect={handleGradientSelect}
        ratioIndex={ratioIndex}
        onRatioChange={setRatioIndex}
        delta={delta}
        onDeltaChange={setDelta}
        text={text}
        onTextChange={setText}
      />
    </div>
  );
};

export default App;