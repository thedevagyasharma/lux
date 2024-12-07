import React from 'react';
import GradientSelector from '../GradientSelector/GradientSelector';
import Slider from '../Slider/Slider';
import { uniqueRatios } from '@/app/utils/uniqueRatios';
import Card from '../Card/Card';
import './Tools.css';

interface ToolsProps {
  selectedGradient: { id: string; colors: string[]; stops: number[] } | null;
  onSelect: (gradient: { id: string; colors: string[]; stops: number[] }) => void;
  ratioIndex: number;
  onRatioChange: (index: number) => void;
  delta: number;
  onDeltaChange: (value: number) => void;
  text: string;
  onTextChange: (text: string) => void;
}

const Tools: React.FC<ToolsProps> = ({ selectedGradient, onSelect, ratioIndex, onRatioChange, delta, onDeltaChange, text, onTextChange }) => {
  return (
    <div className='tools-container'>
      <div className='tool'>
        <GradientSelector selectedGradient={selectedGradient} onSelect={onSelect} />
      </div>
      
      <div className='sliders'>
        <div className='tool-title'>
          RATIO
        </div>
        <Slider
          value={ratioIndex}
          onChange={onRatioChange}
          min={0}
          max={uniqueRatios.length - 1}
          step={1}
          list="ratios"
          isRatioSlider={true}
        />
        <div className='tool-title'>
          DELTA
        </div>
        <Slider
            value={delta}
            onChange={onDeltaChange}
            min={0}
            max={6.28}
            step={0.01}
            list="deltas"
            isRatioSlider={false}
          />
      </div>

      <div className="tool">
        <div className="tool-title">
          Enter Text Here
        </div>
        <input type="text"
        value={text}
        onChange={(e)=> onTextChange(e.target.value)}
        placeholder="Edit text here" />
        
      </div>

      <Card
        gradient={selectedGradient}
        a={uniqueRatios[ratioIndex].a}
        b={uniqueRatios[ratioIndex].b}
        delta={delta}
        text={text}
      />
    </div>
  );
};

export default Tools;