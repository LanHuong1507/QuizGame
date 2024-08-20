import React from 'react';
import './ResultPage.css';

interface ResultPageProps {
  score: number;
  totalQuestions: number;
  totalPoints: number;
  correctAnswers: number;
  userName: string; // Add userName to props
}

const ResultPage: React.FC<ResultPageProps> = ({
  score,
  totalQuestions,
  totalPoints,
  correctAnswers,
  userName,
}) => {
  return (
    <div className="result-page">
      <h1>Quiz Results</h1>
      <p><strong>{userName}</strong>, here are your results:</p>
      <div className="results-summary">
        <p><strong>Score:</strong> {score} / {totalPoints}</p>
        <p><strong>Total Questions:</strong> {totalQuestions}</p>
        <p><strong>Correct Answers:</strong> {correctAnswers}</p>
      </div>
      <button className="restart-button" onClick={() => window.location.reload()}>
        Restart Quiz
      </button>
    </div>
  );
};

export default ResultPage;
