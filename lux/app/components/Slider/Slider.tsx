
import React from 'react';
import { uniqueRatios } from '@/app/utils/uniqueRatios';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value, onChange }) => {
  return (
    <div className='slider-container'>
      <input
        type='range'
        min='0'
        max={uniqueRatios.length - 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        step='1'
        list='tickmarks'
      />
      <datalist id='tickmarks'>
        {uniqueRatios.map((ratio, index) => (
          <option key={index} value={index} label={`${ratio.a}/${ratio.b}`} />
        ))}
      </datalist>
    </div>
  );
};

export default Slider;