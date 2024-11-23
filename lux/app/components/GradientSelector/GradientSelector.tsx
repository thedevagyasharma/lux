"use client"

import React, { useState } from 'react';
import { GRADIENTS } from '@/app/utils/gradients';

const GradientSelector = () => {
  const [selectedGradient, setSelectedGradient] = useState({});

  const handleGradientSelect = (newGradient: { id: string; colors: string[]; stops: number[] }) => {
    setSelectedGradient(newGradient);
    console.log('Set: ' + newGradient.id);
  };

  return (
    <>
        {GRADIENTS.map((gradient, index) => (
            <>
          <button
            key={index}
            style={{
              background: `linear-gradient(135deg, ${gradient.colors.join(', ')})`,
            }}
            onClick={() => handleGradientSelect(gradient)}
          >
          </button>
            </>
            
        ))}
    </>
  );
};

export default GradientSelector;