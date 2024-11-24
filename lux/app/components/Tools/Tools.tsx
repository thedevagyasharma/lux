import React from 'react';
import GradientSelector from '../GradientSelector/GradientSelector';
import Slider from '../Slider/Slider'; // Import the new Slider component
import { uniqueRatios } from '@/app/utils/uniqueRatios';
import './Tools.css';

interface ToolsProps {
  selectedGradient: { id: string; colors: string[]; stops: number[] } | null;
  onSelect: (gradient: { id: string; colors: string[]; stops: number[] }) => void;
  ratioIndex: number;
  onRatioChange: (index: number) => void;
  delta: number;
  onDeltaChange: (value: number) => void;
}

const Tools: React.FC<ToolsProps> = ({ selectedGradient, onSelect, ratioIndex, onRatioChange, delta, onDeltaChange }) => {
  return (
    <div className='tools-container'>
      <div className='tool'>
        <GradientSelector selectedGradient={selectedGradient} onSelect={onSelect} />
      </div>
      
      <div className='sliders'>
        <label>
          Ratio:
          <Slider value={ratioIndex} onChange={onRatioChange} />
          {uniqueRatios[ratioIndex].a}/{uniqueRatios[ratioIndex].b}
        </label>
        <label>
          Delta:
          <input type='range' min='0' max='6.28' step='0.01' value={delta} onChange={(e) => onDeltaChange(Number(e.target.value))} />
        </label>
      </div>
    </div>
  );
};

export default Tools;