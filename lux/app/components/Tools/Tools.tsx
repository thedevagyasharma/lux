import React from 'react';
import GradientSelector from '../GradientSelector/GradientSelector';
import Slider from '../Slider/Slider';
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
        </label>
        <Slider
            value={ratioIndex}
            onChange={onRatioChange}
            min={0}
            max={uniqueRatios.length - 1}
            step={1}
            list='tickmarks'
          />
          {uniqueRatios[ratioIndex].a}/{uniqueRatios[ratioIndex].b}
        <label>
          Delta:
        </label>
        <Slider
            value={delta}
            onChange={onDeltaChange}
            min={0}
            max={6.28}
            step={0.01}
          />
      </div>
    </div>
  );
};

export default Tools;