import React from 'react';
import './GradientButton.css';

interface GradientButtonProps {
  gradient: { id: string; colors: string[]; stops: number[] };
  selectedGradient: { id: string; colors: string[]; stops: number[] } | null;
  onSelect: (gradient: { id: string; colors: string[]; stops: number[] }) => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({ gradient, selectedGradient, onSelect }) => {
  const isSelected = selectedGradient?.id === gradient.id;

  return (
    <button
      className={isSelected ? 'selected' : ''}
      onClick={() => onSelect(gradient)}
    >
      <div
        className="gradient"
        style={{
          background: `linear-gradient(135deg, ${gradient.colors.join(', ')})`,
        }}
      ></div>
    </button>
  );
};

export default GradientButton;