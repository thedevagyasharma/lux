import React from 'react';
import { uniqueRatios } from '@/app/utils/uniqueRatios';
import './Slider.css';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  list?: string;
}

const Slider: React.FC<SliderProps> = ({ value, onChange, min, max, step, list }) => {
  // const fillWidth = Math.max(0, ((value - min) / (max - min)) * (100 - 4)+4);
  const percentage = ((value - min) / (max - min)) * 93;
  return (
    <div className='slider-container'>
      <div className='slider-fill' style={{ width: `calc(16px + ${percentage}%)` }}></div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        step={step}
        list={list}
      />
      {list && (
        <datalist id={list}>
          {uniqueRatios.map((ratio, index) => (
            <option key={index} value={index} label={`${ratio.a}/${ratio.b}`} />
          ))}
        </datalist>
      )}
    </div>
  );
};

export default Slider;