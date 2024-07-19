import React from 'react';
import './ResultPage.css';

interface ResultPageProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="result-page">
      <h1>Quiz Complete</h1>
      <p>Your Score: {score} out of {totalQuestions}</p>
      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  );
};

export default ResultPage;
