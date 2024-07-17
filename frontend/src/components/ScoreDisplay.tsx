import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div>
      <h3>Score: {score}</h3>
    </div>
  );
};

export default ScoreDisplay;
