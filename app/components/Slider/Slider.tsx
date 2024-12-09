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
  isRatioSlider?: boolean;
}

const Slider: React.FC<SliderProps> = ({ value, onChange, min, max, step, list, isRatioSlider = false }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const ratio = isRatioSlider ? uniqueRatios[value] : null;

  return (
    <div className='slider'>
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
            {isRatioSlider
              ? uniqueRatios.map((ratio, index) => (
                  <option key={index} value={index} label={`${ratio.a}/${ratio.b}`} />
                ))
              : Array.from({ length: Math.ceil((max - min) / step) + 1 }, (_, i) => (
                  <option key={i} value={min + i * step} label={`${(min + i * step).toFixed(2)}`} />
                ))}
          </datalist>
        )}
      </div>
      <div className='slider-value'>
        {isRatioSlider ? (ratio ? `${ratio.a}/${ratio.b}` : '') : value.toFixed(2)}
      </div>
    </div>
  );
};

export default Slider;