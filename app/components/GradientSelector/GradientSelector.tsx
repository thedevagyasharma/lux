'use client';

import React, { useState } from 'react';
import { GRADIENTS } from '@/app/utils/gradients';
import GradientButton from '../GradientButton/GradientButton';
import './GradientSelector.css';

interface GradientSelectorProps {
  selectedGradient: { id: string; colors: string[]; stops: number[] } | null;
  onSelect: (gradient: { id: string; colors: string[]; stops: number[] }) => void;
}

const GradientSelector: React.FC<GradientSelectorProps> = ({ selectedGradient, onSelect }) => {
  return (
    <>
    <div className='tool-title'>
      SELECT A GRADIENT
    </div>
    <div className='gradient-selector'>
      {GRADIENTS.map((gradient, index) => (
        <GradientButton
          key={index}
          gradient={gradient}
          selectedGradient={selectedGradient}
          onSelect={onSelect}
        />
      ))}
    </div>
    </>
  );
};

export default GradientSelector;