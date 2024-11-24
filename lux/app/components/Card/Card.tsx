import React from 'react';
import Color from 'color';
import './Card.css';
import LCurve from '../LCurve/LCurve';
LCurve

interface CardProps {
  gradient: { id: string; colors: string[]; stops: number[] } | null;
  a: number;
  b: number;
  delta: number;
}

const width = 236; // 16px margin from each side of the stroke

const Card: React.FC<CardProps> = ({ gradient, a, b, delta }) => {
  const backgroundColor = gradient
    ? Color(gradient.colors[0]).lightness(95).hex()
    : 'none';
  return (
    <div>
      <div className='card'
       style={{ background: backgroundColor }}>
        <div className='square-box'>
          <LCurve a={a} b={b} delta={delta} width={width} height={width} gradient={gradient} />
        </div>
        <div className='outline'>
        </div>
      </div>
    </div>
  );
};

export default Card;