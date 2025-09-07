import React, { useRef } from 'react';
import GradientSelector from '../GradientSelector/GradientSelector';
import Slider from '../Slider/Slider';
import { uniqueRatios } from '@/app/utils/uniqueRatios';
import Card from '../Card/Card';
import './Tools.css';
import * as htmlToImage from 'html-to-image';

interface ToolsProps {
  selectedGradient: { id: string; colors: string[]; stops: number[] } | null;
  onSelect: (gradient: { id: string; colors: string[]; stops: number[] }) => void;
  ratioIndex: number;
  onRatioChange: (index: number) => void;
  delta: number;
  onDeltaChange: (value: number) => void;
  text: string;
  onTextChange: (text: string) => void;
  spokes: number;
  onSpokesChange: (value: number) => void;
  stroke: number;
  onStrokeChange: (value: number) => void;
}

const Tools: React.FC<ToolsProps> = ({ selectedGradient, onSelect, ratioIndex, onRatioChange, delta, onDeltaChange, text, onTextChange, spokes, onSpokesChange, stroke, onStrokeChange }) => {

  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(cardRef.current);

        // Create a temporary <a> element
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'card.png';
        link.click();
      } catch (err) {
        console.error('Failed to generate image:', err);
      }
    }
  };

  return (
    <div className='tools-container'>
      <div className="section">
        <div className='tool'>
          <GradientSelector selectedGradient={selectedGradient} onSelect={onSelect} />
        </div>

        <div className='tool'>
          <div className='tool-title'>
            CURVE RATIO
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
            CURVEDELTA
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
          <div className='tool-title'>
            STAR SPOKES
          </div>
          <Slider
            value={spokes}
            onChange={onSpokesChange}
            min={3}
            max={20}
            step={1}
            list="spokes"
            isRatioSlider={false}
          />
          <div className='tool-title'>
            STAR STROKE
          </div>
          <Slider
            value={stroke}
            onChange={onStrokeChange}
            min={2}
            max={10}
            step={1}
            list="strokes"
            isRatioSlider={false}
          />
        </div>

        <div className="tool">
          <input type="text"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Enter Text" />
        </div>
        <div className="tool">
          <button type='button' id="downloadButton" onClick={handleDownload}>Download PNG</button>
        </div>
      </div>

      <div className="section">
        <div ref={cardRef}>
          <Card
            gradient={selectedGradient}
            a={uniqueRatios[ratioIndex].a}
            b={uniqueRatios[ratioIndex].b}
            delta={delta}
            text={text}
            spokes={spokes}
            stroke={stroke}
          />
        </div>
      </div>


    </div>
  );
};

export default Tools;