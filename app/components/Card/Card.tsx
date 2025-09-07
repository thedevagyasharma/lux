import React, { forwardRef, useRef, useEffect } from 'react';
import Color from 'color';
import './Card.css';
import LCurve from '../LCurve/LCurve';

interface CardProps {
  gradient: { id: string; colors: string[]; stops: number[] } | null;
  a: number;
  b: number;
  delta: number;
  text: string;
  spokes: number;
  stroke: number;
}

const width = 224; // 16px margin from each side of the stroke

const Card: React.FC<CardProps> = ({ gradient, a, b, delta, text, spokes, stroke }) => {
  
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const lightenedColors = gradient
    ? gradient.colors.map(color => Color(color).lightness(95).hex())
    : [];

  const backgroundColor = gradient
    ? `linear-gradient(135deg, ${lightenedColors.join(', ')})`
    : 'none';
  
  const textColor = gradient ? gradient.colors[0] : '#000';

  const generateStar = (spokes: number) => {
    const angle = (2 * Math.PI) / spokes;
    const lines = [];
    for (let i = 0; i < spokes; i++) {
      const x1 = 50;
      const y1 = 50;
      const x2 = 50 + 32 * Math.cos(i * angle);
      const y2 = 50 + 32 * Math.sin(i * angle);
      lines.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={'#fff'} strokeWidth={stroke} />);
    }
    return lines;
  };

  useEffect(() => {
    const adjustFontSize = () => {
      if (textRef.current) {
        const containerWidth = 236; // Default to 300 if cardRef is not available
        let fontSize = 32; // Initial font size
        textRef.current.style.fontSize = `${fontSize}px`;

        while (textRef.current.scrollWidth > containerWidth && fontSize > 0) {
          fontSize -= 1;
          textRef.current.style.fontSize = `${fontSize}px`;
        }
      }
    };

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);

    return () => {
      window.removeEventListener('resize', adjustFontSize);
    };
  }, [text]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
  if (cardRef.current) {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / rect.height) * -25;
    const rotateY = (x / rect.width) * 25;

    // Shadow follows opposite of the mouse direction
    const shadowX = -(x / rect.width) * 40; 
    const shadowY = -(y / rect.height) * 40;

    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    cardRef.current.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0, 0, 0, 0.5)`;
  }
};

    const handleMouseLeave = () => {
      if (cardRef.current) {
        cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
        cardRef.current.style.boxShadow = '0 0 32px rgba(0, 0, 0, 0.5)';
      }
    };

    if (cardRef.current) {
      cardRef.current.addEventListener('mousemove', handleMouseMove);
      cardRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mousemove', handleMouseMove);
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className='card-container'>
      <div className='card'
       style={{ background: backgroundColor }} ref={cardRef}>
        <div className='shiny-layer'></div>
        <div className='outline'></div>
        <div className='square-box' style={{ background: `linear-gradient(135deg, ${gradient?.colors.join(', ')})` }}>
          <LCurve a={a} b={b} delta={delta} width={width} height={width} gradient={gradient} />
        </div>
        
        <div className="card-text" style={{ color: textColor }} ref={textRef}>
          {text.split(' ').map((word, index) => (
            <span key={index} className={index === 0 ? 'bold' : 'light'}>
              {word}
            </span>
          ))}
        </div>
        <div className="circular-element" style={{ background: `linear-gradient(135deg, ${gradient?.colors.join(', ')})` }}>
          <svg viewBox="0 0 100 100">
            {generateStar(spokes)}
          </svg>
        </div>
        <div className="horizontal-line" style={{ background: `linear-gradient(135deg, ${gradient?.colors.join(', ')})` }}></div>
      </div>
    </div>
  );
}

export default Card;