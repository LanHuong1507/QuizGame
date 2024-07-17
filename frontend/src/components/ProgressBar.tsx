import React from 'react';

interface ProgressBarProps {
  progress: number; // Progress percentage (0-100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div>
      <div style={{ width: `${progress}%`, backgroundColor: 'blue', height: '10px' }} />
    </div>
  );
};

export default ProgressBar;
